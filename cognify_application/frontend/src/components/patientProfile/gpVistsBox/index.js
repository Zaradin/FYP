import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Card,
    CardContent,
    Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateGPVisitDialog from "../../createGPVistDialog";
import { useSnackbar } from "../../../contexts/snackbarContext";
import { addGPVisitToPatient } from "../../../api/cognify-api";
import { useQueryClient } from "react-query";

const GPVisits = ({ patientData }) => {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();
    const [openDialog, setOpenDialog] = useState(false);

    const checkups = patientData?.checkups || [];

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddGPVisit = async (visitData) => {
        try {
            await addGPVisitToPatient(visitData);
            showSnackbar("GP visit added successfully!", "success");
            handleCloseDialog();

            // Invalidate the patient query to refresh the data
            queryClient.invalidateQueries(["patient", patientData._id]);
        } catch (error) {
            console.error("Error adding GP visit:", error);
            showSnackbar("Failed to add GP visit. Please try again.", "error");
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
            elevation={3}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: 1,
                    mb: 3,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        color: "#1976d2",
                    }}
                >
                    GP Visits
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleOpenDialog}
                >
                    Add Visit
                </Button>
            </Box>

            <Box sx={{ maxHeight: 350, overflowY: "auto" }}>
                {checkups.length > 0 ? (
                    checkups.map((visit, index) => (
                        <Card
                            key={index}
                            sx={{
                                mb: 2,
                                boxShadow: 2,
                                transition: "transform 0.2s, box-shadow 0.2s",
                                "&:hover": {
                                    boxShadow: 5, // Deeper shadow on hover
                                    transform: "scale(1.02)", // Slight expansion
                                    cursor: "pointer", // Makes it feel interactive
                                },
                            }}
                            onClick={() =>
                                console.log(`Clicked visit on ${visit.date}`)
                            } // Placeholder for modal
                        >
                            <CardContent>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#1976d2",
                                    }}
                                >
                                    {visit.date} - {visit.doctor}
                                </Typography>

                                <Box sx={{ mt: 1 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Summary:
                                    </Typography>
                                    <Typography variant="body2">
                                        {visit.summary}
                                    </Typography>
                                </Box>

                                <Box sx={{ mt: 1 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Doctor's Note:
                                    </Typography>
                                    <Typography variant="body2">
                                        {visit.note.length > 200
                                            ? `${visit.note.substring(
                                                  0,
                                                  200
                                              )}...`
                                            : visit.note}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography
                        variant="body2"
                        sx={{ color: "#9e9e9e", fontStyle: "italic" }}
                    >
                        No GP visits recorded.
                    </Typography>
                )}
            </Box>

            {/* GP Visit Dialog */}
            <CreateGPVisitDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                handleAddGPVisit={handleAddGPVisit}
                patientId={patientData?._id}
            />
        </Paper>
    );
};

export default GPVisits;
