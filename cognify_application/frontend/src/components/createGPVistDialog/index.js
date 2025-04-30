import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
} from "@mui/material";

const CreateGPVisitDialog = ({
    open,
    handleClose,
    handleAddGPVisit,
    patientId,
}) => {
    const [visitData, setVisitData] = useState({
        date: "",
        doctor: "",
        summary: "",
        note: "",
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!visitData.date) {
            newErrors.date = "Visit date is required";
        }

        if (!visitData.doctor.trim()) {
            newErrors.doctor = "Doctor name is required";
        }

        if (!visitData.summary.trim()) {
            newErrors.summary = "Summary is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVisitData({
            ...visitData,
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
            handleAddGPVisit({
                ...visitData,
                patientId,
            });

            // Reset form
            setVisitData({
                date: "",
                doctor: "",
                summary: "",
                note: "",
            });
        }
    };

    const handleCancel = () => {
        // Reset form and close dialog
        setVisitData({
            date: "",
            doctor: "",
            summary: "",
            note: "",
        });
        setErrors({});
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
            <DialogTitle sx={{ bgcolor: "#1976d2", color: "white" }}>
                Add New GP Visit
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Visit Date"
                            name="date"
                            value={visitData.date}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.date}
                            helperText={errors.date}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Doctor"
                            name="doctor"
                            value={visitData.doctor}
                            onChange={handleChange}
                            error={!!errors.doctor}
                            helperText={errors.doctor}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Summary"
                            name="summary"
                            value={visitData.summary}
                            onChange={handleChange}
                            error={!!errors.summary}
                            helperText={errors.summary}
                            required
                            placeholder="Brief description of the visit"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Doctor's Note"
                            name="note"
                            value={visitData.note}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            placeholder="Detailed notes from the visit"
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
                    Add GP Visit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateGPVisitDialog;
