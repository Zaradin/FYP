import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

const CreateMedicationDialog = ({
    open,
    handleClose,
    handleAddMedication,
    patientId,
}) => {
    const [medicationData, setMedicationData] = useState({
        name: "",
        dose: "",
        frequency: "",
        amount: "",
        prescribedOn: "",
        prescribedBy: "",
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!medicationData.name.trim()) {
            newErrors.name = "Medication name is required";
        }

        if (!medicationData.dose.trim()) {
            newErrors.dose = "Dose is required";
        }

        if (!medicationData.frequency.trim()) {
            newErrors.frequency = "Frequency is required";
        }

        if (!medicationData.prescribedOn) {
            newErrors.prescribedOn = "Prescribed date is required";
        }

        if (!medicationData.prescribedBy.trim()) {
            newErrors.prescribedBy = "Prescribing doctor is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedicationData({
            ...medicationData,
            [name]: value,
        });

        // Clear the error for this field if it exists
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            });
        }
    };

    const handleSubmit = () => {
        if (validateForm()) {
            handleAddMedication({
                ...medicationData,
                patientId,
            });

            // Reset form
            setMedicationData({
                name: "",
                dose: "",
                frequency: "",
                amount: "",
                prescribedOn: "",
                prescribedBy: "",
            });
        }
    };

    const handleCancel = () => {
        // Reset form and close dialog
        setMedicationData({
            name: "",
            dose: "",
            frequency: "",
            amount: "",
            prescribedOn: "",
            prescribedBy: "",
        });
        setErrors({});
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
            <DialogTitle sx={{ bgcolor: "#1976d2", color: "white" }}>
                Add New Medication
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Medication Name"
                            name="name"
                            value={medicationData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Dose"
                            name="dose"
                            value={medicationData.dose}
                            onChange={handleChange}
                            error={!!errors.dose}
                            helperText={errors.dose}
                            placeholder="e.g., 10mg"
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl
                            fullWidth
                            required
                            error={!!errors.frequency}
                        >
                            <InputLabel id="frequency-label">
                                Frequency
                            </InputLabel>
                            <Select
                                labelId="frequency-label"
                                name="frequency"
                                value={medicationData.frequency}
                                label="Frequency"
                                onChange={handleChange}
                            >
                                <MenuItem value="Once daily">
                                    Once daily
                                </MenuItem>
                                <MenuItem value="Twice daily">
                                    Twice daily
                                </MenuItem>
                                <MenuItem value="Three times daily">
                                    Three times daily
                                </MenuItem>
                                <MenuItem value="Four times daily">
                                    Four times daily
                                </MenuItem>
                                <MenuItem value="Every 4 hours">
                                    Every 4 hours
                                </MenuItem>
                                <MenuItem value="Every 6 hours">
                                    Every 6 hours
                                </MenuItem>
                                <MenuItem value="Every 8 hours">
                                    Every 8 hours
                                </MenuItem>
                                <MenuItem value="Every 12 hours">
                                    Every 12 hours
                                </MenuItem>
                                <MenuItem value="As needed">As needed</MenuItem>
                                <MenuItem value="Weekly">Weekly</MenuItem>
                                <MenuItem value="Monthly">Monthly</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Prescribed Amount"
                            name="amount"
                            value={medicationData.amount}
                            onChange={handleChange}
                            placeholder="e.g., 30 tablets"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Prescribed On"
                            name="prescribedOn"
                            value={medicationData.prescribedOn}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.prescribedOn}
                            helperText={errors.prescribedOn}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Prescribed By"
                            name="prescribedBy"
                            value={medicationData.prescribedBy}
                            onChange={handleChange}
                            error={!!errors.prescribedBy}
                            helperText={errors.prescribedBy}
                            required
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="error">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    Add Medication
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateMedicationDialog;
