import React, { useState } from "react";
import {
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateMedicationDialog from "../../createMedicationDialog";
import { useSnackbar } from "../../../contexts/snackbarContext";
import { addMedicationToPatient } from "../../../api/cognify-api";
import { useQueryClient } from "react-query";

const MedicationInfo = ({ patientData }) => {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();
    const [openDialog, setOpenDialog] = useState(false);

    // Check if medications exist and is an array, default to an empty array if not
    const medications = patientData?.medications || [];

    const handleOpenDialog = () => { 
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddMedication = async (medicationData) => {
        try {
            await addMedicationToPatient(medicationData);
            showSnackbar("Medication added successfully!", "success");
            handleCloseDialog();

            // Invalidate the patient query to refresh the data
            queryClient.invalidateQueries(["patient", patientData._id]);
        } catch (error) {
            console.error("Error adding medication:", error);
            showSnackbar(
                "Failed to add medication. Please try again.",
                "error"
            );
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
                    Medication History
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleOpenDialog}
                >
                    Add Medication
                </Button>
            </Box>
            <TableContainer
                sx={{
                    maxHeight: 300, // Set max height for scrollable area
                    overflowY: "auto", // Enables vertical scrolling if content exceeds maxHeight
                }}
            >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {[
                                "Medication",
                                "Dose",
                                "Frequency",
                                "Prescribed Amount",
                                "Prescribed On",
                                "Prescribed By",
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
                        {medications.length > 0 ? (
                            medications.map((med, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        "&:nth-of-type(even)": {
                                            backgroundColor: "#f9f9f9",
                                        },
                                    }}
                                >
                                    <TableCell>{med.name || "N/A"}</TableCell>
                                    <TableCell>{med.dose || "N/A"}</TableCell>
                                    <TableCell>
                                        {med.frequency || "N/A"}
                                    </TableCell>
                                    <TableCell>{med.amount || "N/A"}</TableCell>
                                    <TableCell>
                                        {med.prescribedOn || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {med.prescribedBy || "N/A"}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    align="center"
                                    sx={{
                                        fontStyle: "italic",
                                        color: "#9e9e9e",
                                    }}
                                >
                                    No medications found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Medication Dialog */}
            <CreateMedicationDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                handleAddMedication={handleAddMedication}
                patientId={patientData?._id}
            />
        </Paper>
    );
};

export default MedicationInfo;
