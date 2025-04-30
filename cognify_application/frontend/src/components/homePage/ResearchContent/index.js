import React from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import brainAiImage from "../../../images/research_image.jpg";
import brain_model from "../../../images/research.svg";
import training_loss from "../../../images/training_loss_20250326_083352-1.png";
import validation_accuracy from "../../../images/validation_accuracy_20250326_083352-1.png";
import roc_curve from "../../../images/roc_curve_comparison-1.png";

const ResearchContent = () => {
    // Sample data for model metrics
    const modelData = [
        {
            model: "ResNet-50",
            resolution: "72x72x72",
            accuracy: "76.25%",
            precision: "75.63",
            recall: "61.05",
            auc: "79.76",
        },
        {
            model: "ResNet-50",
            resolution: "36x36x36",
            accuracy: "72.64%",
            precision: "71.47",
            recall: "55.44",
            auc: "78.44",
        },
        {
            model: "ResNet-34",
            resolution: "72x72x72",
            accuracy: "76.11%",
            precision: "74.96",
            recall: "64.56",
            auc: "82.29",
        },
        {
            model: "DenseNet-201",
            resolution: "72x72x72",
            accuracy: "82.22%",
            precision: "80.86",
            recall: "72.28",
            auc: "88.61",
        },
        {
            model: "DenseNet-201",
            resolution: "36x36x36",
            accuracy: "71.25%",
            precision: "69.60",
            recall: "51.58",
            auc: "74.92",
        },
        {
            model: "SENet",
            resolution: "72x72x72",
            accuracy: "80.28%",
            precision: "85.13",
            recall: "62.11",
            auc: "86.76",
        },
        {
            model: "SENet",
            resolution: "36x36x36",
            accuracy: "68.19%",
            precision: "67.99",
            recall: "46.32",
            auc: "75.59",
        },
    ];

    return (
        <Box>
            {/* Parallax Header */}
            <Box
                sx={{
                    height: "45vh",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(${brainAiImage})`,
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    zIndex: 1,
                }}
            >
                {/* Dark Gradient Overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                            "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1))",
                        zIndex: 0,
                    }}
                ></Box>

                {/* Grid Container */}
                <Grid
                    container
                    sx={{ zIndex: 1, width: "100%", maxWidth: "1200px" }}
                >
                    {/* Left Column (Image) */}
                    <Grid
                        item
                        xs={12}
                        md={5}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            justifyContent: "flex-end",
                            alignItems: "center",
                            pr: 4,
                        }}
                    >
                        <Box
                            component="img"
                            sx={{
                                height: 300,
                                width: 350,
                            }}
                            alt="Brain model"
                            src={brain_model}
                        />
                    </Grid>

                    {/* Right Column (Text) */}
                    <Grid
                        item
                        xs={12}
                        md={7}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            pl: 4,
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                color: "white",
                                textAlign: "left",
                                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                                whiteSpace: "pre-line",
                                fontSize: { xs: "1.5rem", sm: "2rem" },
                            }}
                        >
                            Model Performance
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                color: "white",
                                textAlign: "left",
                                marginTop: "30px",
                                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                                fontSize: { xs: "1rem", sm: "1.25rem" },
                            }}
                        >
                            Deep Learning Models for Alzheimer's Detection
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            {/* Research Overview */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        textAlign: "center",
                        mb: 6,
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                    }}
                >
                    Deep Learning Models for Alzheimer's Detection
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "justify",
                        fontSize: "1.1rem",
                        fontFamily: "sans-serif",
                        lineHeight: 1.6,
                        whiteSpace: "pre-line",
                    }}
                >
                    The research focuses on implementing and evaluating various
                    deep learning architectures for the detection of Alzheimer's
                    disease from MRI scans, along with the impact of image
                    resolution.
                    {"\n\n"}
                    The models were trained on the Alzheimer's Disease
                    Neuroimaging Initiative (ADNI1) dataset, which included both
                    Alzheimer's patients and healthy controls. Stratified k-fold
                    cross-validation was used to ensure robust evaluation and
                    prevent overfitting.
                    {"\n\n"}
                    Key models in the comparison included:
                    {"\n"}• ResNet-50
                    {"\n"}• ResNet-34
                    {"\n"}• DenseNet-201
                    {"\n"}• SENet
                    {"\n\n"}
                    Each model was evaluated using standard performance metrics
                    including accuracy, precision, recall, and AUC score to
                    provide a comprehensive assessment of their diagnostic
                    capabilities.
                </Typography>
            </Container>

            {/* Model Performance Table */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        textAlign: "center",
                        mb: 6,
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                    }}
                >
                    Model Performance Comparison
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "justify",
                        fontSize: "1.1rem",
                        fontFamily: "sans-serif",
                        lineHeight: 1.6,
                        mb: 4,
                    }}
                >
                    Evaluation for each model's performance was done on the test
                    dataset to determine which architecture provides the most
                    reliable Alzheimer's detection. The table below summarizes
                    the key performance metrics across all models along with two
                    different 3D image resolutions.
                </Typography>

                <TableContainer component={Paper} elevation={3} sx={{ mb: 6 }}>
                    <Table
                        sx={{ minWidth: 650 }}
                        aria-label="model performance table"
                    >
                        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>
                                    Model Architecture
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Resolution
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Accuracy
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Precision
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Recall
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    AUC Score
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {modelData.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        "&:nth-of-type(odd)": {
                                            backgroundColor: "#fafafa",
                                        },
                                        // Highlight the DenseNet-201 row
                                        ...(row.model === "DenseNet-201"
                                            ? {
                                                  backgroundColor: "#e8f4fd",
                                                  fontWeight: "bold",
                                              }
                                            : {}),
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.model}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.resolution}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.accuracy}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.precision}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.recall}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.auc}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "justify",
                        fontSize: "1.1rem",
                        fontFamily: "sans-serif",
                        lineHeight: 1.6,
                    }}
                >
                    Based on models evaluation, the DenseNet-201 (72x72x72)
                    model emerged as the top performer with an accuracy of
                    82.22% and 88.61 AUC score. This model outperformed all
                    other architectures across most metrics, showing exceptional
                    balance between precision and recall.
                </Typography>
            </Container>

            {/* DenseNet-201 Detailed Performance */}
            <Container maxWidth="lg" sx={{ py: 8, backgroundColor: "#f9f9f9" }}>
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        textAlign: "center",
                        mb: 6,
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                    }}
                >
                    DenseNet-201 Performance Metrics
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "justify",
                        fontSize: "1.1rem",
                        fontFamily: "sans-serif",
                        lineHeight: 1.6,
                        mb: 4,
                    }}
                >
                    As the best-performing model, below is a more detailed
                    analysis of the DenseNet-201 architecture. The
                    visualizations below illustrate key performance
                    characteristics throughout the training process and final
                    evaluation.
                </Typography>

                <Grid container spacing={4}>
                    {/* Training Loss Chart */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{
                                    color: "#3f51b5",
                                    mb: 2,
                                    textAlign: "center",
                                }}
                            >
                                Training & Validation Loss
                            </Typography>
                            <Box
                                component="img"
                                src={training_loss}
                                alt="Training and Validation Loss"
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    maxWidth: "300px",
                                    mb: 2,
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{ textAlign: "center" }}
                            >
                                The convergence of training and validation loss
                                curves indicates the model is learning
                                effectively without overfitting. Showing strong
                                generalization capabilities.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Validation Accuracy Chart */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{
                                    color: "#3f51b5",
                                    mb: 2,
                                    textAlign: "center",
                                }}
                            >
                                Validation Accuracy
                            </Typography>
                            <Box
                                component="img"
                                src={validation_accuracy}
                                alt="Validation Accuracy"
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    maxWidth: "300px",
                                    mb: 2,
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{ textAlign: "center" }}
                            >
                                The validation accuracy stabilized at 80% after
                                18 epochs, with minimal fluctuations in the
                                final stages of training. This indicates the
                                model has learned robust features for
                                classifying Alzheimer's from MRI scans.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* ROC Curve */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{
                                    color: "#3f51b5",
                                    mb: 2,
                                    textAlign: "center",
                                }}
                            >
                                ROC Curve Analysis
                            </Typography>
                            <Box
                                component="img"
                                src={roc_curve}
                                alt="ROC Curve"
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    maxWidth: "300px",
                                    mb: 2,
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{ textAlign: "center" }}
                            >
                                With an Area Under the Curve (AUC) of 8.61, the
                                DenseNet-201 model demonstrates excellent
                                discrimination capability between Alzheimer's
                                and non-Alzheimer's cases. The high AUC value
                                confirms the model's reliability for clinical
                                application.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Typography
                    variant="body1"
                    sx={{
                        paddingTop: "35px",
                        textAlign: "justify",
                        fontSize: "1.1rem",
                        fontFamily: "sans-serif",
                        lineHeight: 1.6,
                        mt: 4,
                    }}
                >
                    These visualizations highlight the effectiveness of the
                    DenseNet-201 architecture for Alzheimer's detection. The
                    model achieves high accuracy while maintaining good
                    generalization properties, as evidenced by the consistent
                    validation metrics. The ROC curve analysis further confirms
                    the model's strong discrimination ability, making it a
                    promising tool for clinical assistance.
                </Typography>
            </Container>
        </Box>
    );
};

export default ResearchContent;
