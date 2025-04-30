import React, { useState } from "react";
import {
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Divider,
    Button,
} from "@mui/material";

const CreatePatientDialog = ({ open, handleClose, handleCreatePatient }) => {
    const [patientData, setPatientData] = useState({
        patientFirstName: "",
        surname: "",
        dob: "",
        gender: "",
        address: "",
        phoneNumber: "",
        email: "",
        gpAddress: "",
        gpName: "",
        gpPhone: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        handleCreatePatient(patientData); // Pass data to parent component
        setPatientData({
            // Reset form
            patientFirstName: "",
            surname: "",
            dob: "",
            gender: "",
            address: "",
            phoneNumber: "",
            email: "",
            gpAddress: "",
            gpName: "",
            gpPhone: "",
        });
        handleClose(); // Close modal
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Create Patient</DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container spacing={2}>
                    {/* Row 1: First Name and Surname */}
                    <Grid item xs={6}>
                        <TextField
                            label="First Name"
                            name="patientFirstName"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={patientData.patientFirstName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Surname"
                            name="surname"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={patientData.surname}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Row 2: Date of Birth and Gender */}
                    <Grid item xs={6}>
                        <TextField
                            label="Date of Birth"
                            name="dob"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="date"
                            value={patientData.dob}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Gender</InputLabel>
                            <Select
                                name="gender"
                                value={patientData.gender}
                                onChange={handleInputChange}
                                label="Gender"
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Prefer not to say">
                                    Prefer not to say
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Row 3: Address and Phone Number */}
                    <Grid item xs={6}>
                        <TextField
                            label="Address"
                            name="address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={patientData.address}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={patientData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Row 4: Email and GP Address */}
                    <Grid item xs={6}>
                        <TextField
                            label="Email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={patientData.email}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="GP Address"
                            name="gpAddress"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={patientData.gpAddress}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Row 5: GP Name and GP Phone */}
                    <Grid item xs={6}>
                        <TextField
                            label="GP Name"
                            name="gpName"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={patientData.gpName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="GP Phone"
                            name="gpPhone"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={patientData.gpPhone}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreatePatientDialog;
