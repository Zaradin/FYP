import React from "react";
import { Box, Typography, Grid, Divider, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import PatientInfo from "../components/patientProfile/patientInfoBox";
import MedicationInfo from "../components/patientProfile/medicationInfoBox";
import GPVists from "../components/patientProfile/gpVistsBox";
import ImagingInfo from "../components/patientProfile/imagingInfoBox";
import { getPatientById } from "../api/cognify-api";
import { useQuery } from "react-query";

const PatientPage = () => {
    const { id } = useParams();
    console.log("Extracted ID:", id);

    const {
        data: patientInfo,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["patient", id],
        queryFn: () => getPatientById(id),
        enabled: !!id,
    });

    return (
        <Box>
            <Typography variant="h4">Patient Profile</Typography>
            <Box sx={{ mb: 4 }}>
                <Divider />
            </Box>

            {isLoading ? (
                <>
                    {/* Skeleton for loading patient data */}
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                        sx={{ mt: 2 }}
                    />
                    <Skeleton
                        variant="text"
                        width="50%"
                        height={30}
                        sx={{ mt: 2 }}
                    />
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                        sx={{ mt: 2 }}
                    />
                </>
            ) : error ? (
                <Typography color="error">
                    Failed to load patient data. Please try again later.
                </Typography>
            ) : patientInfo ? (
                <>
                    {/* Patient Info & Medication History */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={5}>
                            <PatientInfo patientData={patientInfo} />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <MedicationInfo patientData={patientInfo} />
                        </Grid>
                    </Grid>

                    {/* Add margin to separate sections */}
                    <Box sx={{ mt: 4 }} />

                    {/* Checkups & Imaging History */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={5}>
                            <GPVists patientData={patientInfo} />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <ImagingInfo patientData={patientInfo} />
                        </Grid>
                    </Grid>
                </>
            ) : (
                <Typography>No Patient Info Available</Typography>
            )}
        </Box>
    );
};

export default PatientPage;
