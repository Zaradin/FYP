import React, { useState } from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import { useSnackbar } from "../contexts/snackbarContext";
import { createPatient, getPatients } from "../api/cognify-api";
import PatientsLookUpTable from "../components/patientsLookUpTable";
import CreatePatientDialog from "../components/createPatientDialog";
import { useQuery } from "react-query";

const PatientsPage = () => {
    const { data, error, isLoading, isError, refetch } = useQuery(
        "patients",
        getPatients
    );

    const { showSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useState({
        patientId: "",
        patientFirstName: "",
        surname: "",
        dob: "",
        address: "",
        fromDate: "",
        toDate: "",
        doctorName: "",
        dateAdded: "",
    });

    // Open and close modal functions
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Create patient and refresh table
    const handleCreatePatient = async (newPatientData) => {
        try {
            await createPatient(newPatientData);
            showSnackbar("Patient created successfully!", "success");
            setOpen(false);
            refetch(); // Refresh patient data
        } catch (error) {
            showSnackbar("Error creating patient", "error");
        }
    };

    // Handle search filters
    const handleSearchChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value,
        });
    };

    const handleResetButton = () => {
        setSearchParams({
            patientId: "",
            patientFirstName: "",
            surname: "",
            dob: "",
            fromDate: "",
            toDate: "",
            doctorName: "",
            address: "",
            dateAdded: "",
        });
    };

    // Filter patients based on search parameters
    const filteredPatients = data
        ? data.filter((patient) => {
              const isFirstNameMatch = patient.patientFirstName
                  .toLowerCase()
                  .includes(searchParams.patientFirstName.toLowerCase());

              const isSurnameMatch = patient.surname
                  .toLowerCase()
                  .includes(searchParams.surname.toLowerCase());

              const isIdMatch = patient._id.includes(searchParams.patientId);

              const isDateInRange =
                  (!searchParams.fromDate ||
                      new Date(patient.dob) >=
                          new Date(searchParams.fromDate)) &&
                  (!searchParams.toDate ||
                      new Date(patient.dob) <= new Date(searchParams.toDate));

              const isDoctorMatch = patient.gpName
                  .toLowerCase()
                  .includes(searchParams.doctorName.toLowerCase());

              const isAddressMatch = patient.address
                  .toLowerCase()
                  .includes(searchParams.address.toLowerCase());

              const isDobMatch =
                  !searchParams.dob || patient.dob.includes(searchParams.dob);

              const isDateAddedMatch =
                  !searchParams.dateAdded ||
                  new Date(patient.dateAdded)
                      .toLocaleDateString()
                      .includes(
                          new Date(searchParams.dateAdded).toLocaleDateString()
                      );

              return (
                  isFirstNameMatch &&
                  isSurnameMatch &&
                  isIdMatch &&
                  isDateInRange &&
                  isDoctorMatch &&
                  isAddressMatch &&
                  isDobMatch &&
                  isDateAddedMatch
              );
          })
        : [];

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4">Patients</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                >
                    Create Patient
                </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Search Filters */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    p: 2,
                    marginBottom: 3,
                }}
            >
                <TextField
                    label="Patient ID"
                    name="patientId"
                    value={searchParams.patientId}
                    onChange={handleSearchChange}
                    size="small"
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="First Name"
                    name="patientFirstName"
                    value={searchParams.patientFirstName}
                    onChange={handleSearchChange}
                    size="small"
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Surname"
                    name="surname"
                    value={searchParams.surname}
                    onChange={handleSearchChange}
                    size="small"
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="DOB"
                    type="date"
                    name="dob"
                    value={searchParams.dob}
                    onChange={handleSearchChange}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Address"
                    name="address"
                    value={searchParams.address}
                    onChange={handleSearchChange}
                    size="small"
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Doctor Name"
                    name="doctorName"
                    value={searchParams.doctorName}
                    onChange={handleSearchChange}
                    size="small"
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Date Added"
                    type="date"
                    name="dateAdded"
                    value={searchParams.dateAdded}
                    onChange={handleSearchChange}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginRight: 2 }}
                />
                <Button variant="outlined" onClick={handleResetButton}>
                    Reset
                </Button>
            </Box>

            {/* Patients Table */}

            {/* Implement the loading and is error stuff here using the skeletons*/}
            <PatientsLookUpTable patients={filteredPatients} />

            {/* Create Patient Modal */}
            <CreatePatientDialog
                open={open}
                handleClose={handleClose}
                handleCreatePatient={handleCreatePatient}
            />
        </Box>
    );
};

export default PatientsPage;
