import {
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
    IconButton,
    LinearProgress,
    Alert,
    Chip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { useState } from "react";
import { useQueryClient } from "react-query";
import {
    generatePresignedUrl,
    uploadToS3,
    saveImagingMetadata,
    runModelInference,
} from "../../../api/cognify-api";

const ImagingInfo = ({ patientData }) => {
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    // New state for inference modal
    const [openInferenceModal, setOpenInferenceModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [inferenceResults, setInferenceResults] = useState(null);
    const [inferenceLoading, setInferenceLoading] = useState(false);
    const [inferenceError, setInferenceError] = useState("");

    const queryClient = useQueryClient();

    // Form fields for imaging metadata
    const [formData, setFormData] = useState({
        type: "MRI",
        studyDescription: "",
        seriesDescription: "",
        sliceThickness: "",
        resolution: "",
    });

    const imaging = patientData?.imaging || [];

    const handleViewImage = (url) => {
        // Open in a new window/tab
        window.open(url, "_blank");
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Reset any previous error
            setUploadError("");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const resetForm = () => {
        setSelectedFile(null);
        setDescription("");
        setFormData({
            type: "MRI",
            studyDescription: "",
            seriesDescription: "",
            sliceThickness: "",
            resolution: "",
        });
        setUploadError("");
        setUploadProgress(0);
    };

    const handleDialogClose = () => {
        setOpenUploadDialog(false);
        resetForm();
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadError("Please select a file to upload");
            return;
        }

        if (!formData.studyDescription) {
            setUploadError("Study Description is required");
            return;
        }

        if (!formData.seriesDescription) {
            setUploadError("Series Description is required");
            return;
        }

        setUploading(true);
        setUploadError("");
        setUploadProgress(0);

        try {
            // Step 1: Get a presigned URL from the backend
            const { presignedUrl, fileKey, s3Bucket } =
                await generatePresignedUrl(
                    selectedFile.name,
                    selectedFile.type,
                    patientData._id
                );

            // Step 2: Upload the file directly to S3 using the presigned URL
            await uploadToS3(presignedUrl, selectedFile, (progress) => {
                setUploadProgress(progress);
            });

            // Step 3: Save metadata to MongoDB
            await saveImagingMetadata({
                patientId: patientData._id,
                type: formData.type,
                studyDescription: formData.studyDescription,
                seriesDescription: formData.seriesDescription,
                sliceThickness: formData.sliceThickness,
                resolution: formData.resolution,
                description: description,
                s3Key: fileKey,
                fileName: selectedFile.name,
                fileSize: selectedFile.size,
            });

            // Close the dialog after successful upload
            handleDialogClose();

            // Invalidate the patient query to refresh the data
            queryClient.invalidateQueries(["patient", patientData._id]);
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadError(`Failed to upload file: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    // New handlers for model inference
    const handleRunInference = (image) => {
        setSelectedImage(image);
        setInferenceResults(null);
        setInferenceError("");
        setOpenInferenceModal(true);
    };

    const handleCloseInferenceModal = () => {
        setOpenInferenceModal(false);
        setInferenceResults(null);
        setInferenceError("");
        setSelectedImage(null);
    };

    const handleStartInference = async () => {
        if (!selectedImage || !selectedImage.url) {
            setInferenceError("No image selected for analysis");
            return;
        }

        setInferenceLoading(true);
        setInferenceError("");

        try {
            const results = await runModelInference(selectedImage.url);
            setInferenceResults(results);
        } catch (error) {
            console.error("Inference failed:", error);
            setInferenceError(`Failed to run analysis: ${error.message}`);
        } finally {
            setInferenceLoading(false);
        }
    };

    // Format percentage for display
    const formatProbability = (value) => {
        return (value * 100).toFixed(2) + "%";
    };

    // Determine result text and color based on prediction
    const getResultDisplay = (results) => {
        if (!results) return null;

        const prediction = results.prediction;
        const cnProbability = results.probabilities.CN;
        const adProbability = results.probabilities.AD;

        if (prediction === 0) {
            return {
                text: "Normal",
                color: "success",
                description: "No indicators of Alzheimer's Disease detected",
            };
        } else {
            return {
                text: "Alzheimer's Disease",
                color: "error",
                description: "Indicators of Alzheimer's Disease detected",
            };
        }
    };

    return (
        <Paper
            sx={{
                p: 1,
                border: "1px solid #ccc",
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "#fff",
                paddingTop: "13px",
                paddingBottom: "13px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    borderBottom: "1px solid #ccc",
                    paddingBottom: 1,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        color: "#1976d2",
                    }}
                >
                    Imaging History
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => setOpenUploadDialog(true)}
                    size="small"
                >
                    Upload MRI
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {[
                                "Modality",
                                "Date",
                                "Study",
                                "Series",
                                "Slice Thickness (mm)",
                                "Resolution",
                                "Actions",
                            ].map((col, index) => (
                                <TableCell
                                    key={index}
                                    sx={{
                                        fontWeight: "bold",
                                        backgroundColor: "#f5f5f5", // Light background for header
                                        color: "#1976d2", // Emphasize header text
                                    }}
                                >
                                    {col}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {imaging.length > 0 ? (
                            imaging.map((image, index) => (
                                <TableRow key={index}>
                                    <TableCell>{image.type}</TableCell>
                                    <TableCell>{image.date}</TableCell>
                                    <TableCell>
                                        {image.studyDescription}
                                    </TableCell>
                                    <TableCell>
                                        {image.seriesDescription}
                                    </TableCell>
                                    <TableCell>
                                        {image.sliceThickness}
                                    </TableCell>
                                    <TableCell>{image.resolution}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() =>
                                                    handleViewImage(image.url)
                                                }
                                            >
                                                View
                                            </Button>
                                            {/* New Analyze button */}
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                startIcon={<AnalyticsIcon />}
                                                onClick={() =>
                                                    handleRunInference(image)
                                                }
                                            >
                                                Analyze
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7} // Adjusted to match the number of columns
                                    align="center"
                                    sx={{
                                        fontStyle: "italic",
                                        color: "#9e9e9e",
                                    }}
                                >
                                    No imaging records found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Upload Dialog - Existing code remains the same */}
            <Dialog
                open={openUploadDialog}
                onClose={handleDialogClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Upload MRI Image</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 1 }}>
                        <input
                            accept="image/*,.dcm,.dicom"
                            style={{ display: "none" }}
                            id="mri-file-upload"
                            type="file"
                            onChange={handleFileSelect}
                        />
                        <label htmlFor="mri-file-upload">
                            <Button
                                variant="outlined"
                                component="span"
                                fullWidth
                                startIcon={<AddIcon />}
                                sx={{ mb: 2, mt: 1 }}
                            >
                                Select MRI File
                            </Button>
                        </label>

                        {selectedFile && (
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                Selected: {selectedFile.name} (
                                {(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
                                MB)
                            </Typography>
                        )}

                        {uploadError && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ mb: 2 }}
                            >
                                {uploadError}
                            </Typography>
                        )}

                        {/* Imaging metadata fields */}
                        <TextField
                            select
                            label="Modality"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            fullWidth
                            margin="dense"
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="MRI">MRI</option>
                            <option value="CT">CT</option>
                            <option value="PET">PET</option>
                            <option value="X-Ray">X-Ray</option>
                            <option value="Ultrasound">Ultrasound</option>
                        </TextField>

                        <TextField
                            label="Study Description"
                            name="studyDescription"
                            value={formData.studyDescription}
                            onChange={handleInputChange}
                            fullWidth
                            margin="dense"
                            required
                        />

                        <TextField
                            label="Series Description"
                            name="seriesDescription"
                            value={formData.seriesDescription}
                            onChange={handleInputChange}
                            fullWidth
                            margin="dense"
                            required
                        />

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                label="Slice Thickness (mm)"
                                name="sliceThickness"
                                value={formData.sliceThickness}
                                onChange={handleInputChange}
                                type="number"
                                inputProps={{ min: 0, step: 0.1 }}
                                fullWidth
                                margin="dense"
                            />

                            <TextField
                                label="Resolution"
                                name="resolution"
                                value={formData.resolution}
                                onChange={handleInputChange}
                                placeholder="e.g. 256x256"
                                fullWidth
                                margin="dense"
                            />
                        </Box>

                        <TextField
                            label="Additional Notes"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            margin="dense"
                            multiline
                            rows={3}
                        />
                    </Box>

                    {uploading && (
                        <Box sx={{ mt: 2, mb: 1 }}>
                            <LinearProgress
                                variant="determinate"
                                value={uploadProgress}
                                sx={{ height: 10, borderRadius: 5 }}
                            />
                            <Typography
                                variant="caption"
                                align="center"
                                display="block"
                                sx={{ mt: 1 }}
                            >
                                Uploading: {uploadProgress}%
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button
                        onClick={handleUpload}
                        variant="contained"
                        disabled={uploading || !selectedFile}
                        startIcon={
                            uploading ? (
                                <CircularProgress size={20} />
                            ) : (
                                <CloudUploadIcon />
                            )
                        }
                    >
                        {uploading ? "Uploading..." : "Upload"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* New Inference Modal */}
            <Dialog
                open={openInferenceModal}
                onClose={handleCloseInferenceModal}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Model Analysis - Alzheimer's Detection
                </DialogTitle>
                <DialogContent>
                    {selectedImage && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Analyzing Image:
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {selectedImage.type} -{" "}
                                {selectedImage.studyDescription} -{" "}
                                {selectedImage.seriesDescription}
                            </Typography>

                            {inferenceError && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {inferenceError}
                                </Alert>
                            )}

                            {inferenceLoading && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        my: 4,
                                    }}
                                >
                                    <CircularProgress size={60} />
                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                        Running model analysis, please wait...
                                    </Typography>
                                </Box>
                            )}

                            {inferenceResults && (
                                <Box sx={{ mt: 2 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            mb: 3,
                                        }}
                                    >
                                        <Chip
                                            label={
                                                getResultDisplay(
                                                    inferenceResults
                                                ).text
                                            }
                                            color={
                                                getResultDisplay(
                                                    inferenceResults
                                                ).color
                                            }
                                            size="large"
                                            sx={{
                                                fontSize: "1.1rem",
                                                fontWeight: "bold",
                                                py: 2,
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        sx={{ mb: 2, textAlign: "center" }}
                                    >
                                        {
                                            getResultDisplay(inferenceResults)
                                                .description
                                        }
                                    </Typography>

                                    <Box
                                        sx={{
                                            border: "1px solid #e0e0e0",
                                            borderRadius: 1,
                                            p: 2,
                                            backgroundColor: "#f5f5f5",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight="bold"
                                            sx={{ mb: 1 }}
                                        >
                                            Probability Analysis:
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                mt: 2,
                                            }}
                                        >
                                            <Box sx={{ width: "48%" }}>
                                                <Typography variant="body2">
                                                    Normal (CN):
                                                </Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={
                                                        inferenceResults
                                                            .probabilities.CN *
                                                        100
                                                    }
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        backgroundColor:
                                                            "#e0e0e0",
                                                        "& .MuiLinearProgress-bar":
                                                            {
                                                                backgroundColor:
                                                                    "#4caf50",
                                                            },
                                                    }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    textAlign="right"
                                                    fontWeight="bold"
                                                >
                                                    {formatProbability(
                                                        inferenceResults
                                                            .probabilities.CN
                                                    )}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ width: "48%" }}>
                                                <Typography variant="body2">
                                                    Alzheimer's Disease (AD):
                                                </Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={
                                                        inferenceResults
                                                            .probabilities.AD *
                                                        100
                                                    }
                                                    sx={{
                                                        height: 10,
                                                        borderRadius: 5,
                                                        backgroundColor:
                                                            "#e0e0e0",
                                                        "& .MuiLinearProgress-bar":
                                                            {
                                                                backgroundColor:
                                                                    "#f44336",
                                                            },
                                                    }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    textAlign="right"
                                                    fontWeight="bold"
                                                >
                                                    {formatProbability(
                                                        inferenceResults
                                                            .probabilities.AD
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ mt: 3, display: "block" }}
                                    >
                                        This analysis is provided as a screening
                                        tool and should not replace professional
                                        medical diagnosis. Always consult with a
                                        healthcare provider for proper
                                        interpretation of results.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseInferenceModal}>Close</Button>
                    {!inferenceResults && !inferenceLoading && (
                        <Button
                            onClick={handleStartInference}
                            variant="contained"
                            startIcon={<AnalyticsIcon />}
                            color="secondary"
                        >
                            Run Analysis
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default ImagingInfo;
