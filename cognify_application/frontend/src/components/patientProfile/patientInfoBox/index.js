import { Typography, Grid, Avatar, Paper } from "@mui/material";
import { formatDate } from "../../../util";

const PatientInfo = ({ patientData }) => {
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
            <Typography
                variant="h6"
                sx={{
                    mb: 3,
                    fontWeight: "bold",
                    color: "#1976d2",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: 1,
                }}
            >
                Patient Information
            </Typography>
            <Grid container spacing={1} alignItems="stretch">
                {/* Row 1 - Image and Patient ID */}
                <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            fontSize: 32,
                            bgcolor: "#1976d2",
                            color: "white",
                            margin: "auto",
                        }}
                        src={patientData.imageUrl || ""}
                    >
                        {!patientData.imageUrl && patientData.patientFirstName
                            ? patientData.patientFirstName
                                  .charAt(0)
                                  .toUpperCase()
                            : ""}
                    </Avatar>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={8}
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Patient ID:
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            borderBottom: "1px solid #ccc",
                            paddingBottom: 1,
                        }}
                    >
                        {patientData._id}
                    </Typography>
                </Grid>

                {/* Row 2 - Name, DOB, Gender */}
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Name:
                    </Typography>
                    <Typography variant="body2">
                        {patientData.patientFirstName +
                            " " +
                            patientData.surname}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        DOB:
                    </Typography>
                    <Typography variant="body2">
                        {formatDate(patientData.dob)}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Gender:
                    </Typography>
                    <Typography variant="body2">
                        {patientData.gender}
                    </Typography>
                </Grid>

                {/* Row 3 - Address, Phone, Email */}
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Address:
                    </Typography>
                    <Typography variant="body2">
                        {patientData.address}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Phone:
                    </Typography>
                    <Typography variant="body2">
                        {patientData.phoneNumber}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Email:
                    </Typography>
                    <Typography variant="body2">
                        {patientData.email || "N/A"}
                    </Typography>
                </Grid>

                {/* Row 4 - GP Address, GP Name, GP Phone */}
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        GP Address:
                    </Typography>
                    <Typography variant="body2">
                        {patientData.gpAddress}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        GP Name:
                    </Typography>
                    <Typography variant="body2">
                        {patientData.gpName}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        GP Phone:
                    </Typography>
                    <Typography variant="body2">
                        {patientData.gpPhone || "NA"}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PatientInfo;
