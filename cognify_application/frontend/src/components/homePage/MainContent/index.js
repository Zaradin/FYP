import React from "react";
import { Box, Typography, Grid, Paper, Container } from "@mui/material";
import radiologistImage from "../../../images/radiologist-control-room.jpg";
import head_neurons from "../../../images/head-neurons-white.svg";
import josh_head from "../../../images/josh-head.jpg";
import bernard_head from "../../../images/bernard-head.jpeg";

const Parallax = () => (
    <Box
        sx={{
            height: "45vh",
            position: "relative",
            display: "flex",
            flexDirection: "column", // Stack text vertically
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${radiologistImage})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            zIndex: 1,
        }}
    >
        {/* Dark Gradient Overlay (Bottom to Top) */}
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1))",
                zIndex: 0, // Ensure it stays behind text and image
            }}
        ></Box>

        {/* Grid Container */}
        <Grid container sx={{ zIndex: 1, width: "100%", maxWidth: "1200px" }}>
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
                        height: 233,
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="Head with neurons"
                    src={head_neurons}
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
                    Empowering Alzheimer's Diagnosis with Smart MRI Analysis and
                    Deep Learning
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
                    Accelerating Medical Innovation Through Computation
                </Typography>
            </Grid>
        </Grid>
    </Box>
);

const AboutCognify = () => (
    <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Section Title */}
        <Typography
            variant="h3"
            component="h2"
            sx={{
                textAlign: "center",
                mb: 6,
                fontFamily: "Poppins, sans-serif", // Modern font
                fontWeight: 600,
                letterSpacing: "0.5px",
            }}
        >
            What is Cognify?
        </Typography>

        {/* Single Typography with Line Breaks */}
        <Typography
            variant="body1"
            sx={{
                textAlign: "justify",
                fontSize: "1.1rem",
                fontFamily: "sans-serif",
                lineHeight: 1.6,
                whiteSpace: "pre-line", // Ensures \n works as line breaks
            }}
        >
            Cognify is an innovative platform designed to advance the field of
            medical diagnostics through AI-powered MRI analysis. By leveraging
            deep learning and computational techniques, Cognify aims to enhance
            the accuracy and efficiency of Alzheimer's detection.
            {"\n\n"}
            Our system processes MRI scans using state-of-the-art machine
            learning models, helping healthcare professionals make informed
            decisions. Through real-time analysis and cloud-based accessibility,
            Cognify bridges the gap between medical expertise and cutting-edge
            technology.
            {"\n\n"}
            The platform is built with a focus on accuracy, security, and
            accessibility, ensuring that researchers and clinicians can
            seamlessly integrate AI-driven insights into their workflows. With
            Cognify, the future of Alzheimer's diagnosis is smarter, faster, and
            more reliable.
        </Typography>
    </Container>
);

const TeamSection = () => (
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
            About Us
        </Typography>

        <Grid container spacing={4} justifyContent="center">
            {/* Team Member 1 */}
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            component="img"
                            src={josh_head}
                            alt="Team Member 1"
                            sx={{
                                width: 200,
                                height: 200,
                                borderRadius: "50%",
                                mb: 2,
                                objectFit: "cover",
                            }}
                        />
                        <Typography variant="h5" gutterBottom>
                            Josh Crotty
                        </Typography>
                        <Typography variant="body1" color="grey">
                            Final Year Student | SETU
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            align="center"
                            marginTop="10px"
                        >
                            I am a motivated software systems development
                            student at South East Technological University
                            (SETU) in Co. Waterford. In addition to my academic
                            pursuits, I proudly serve as the Student
                            Representative for my course at South East
                            Technological University (SETU). In this role, I act
                            as the primary contact between students and the
                            course faculty, including the course head and the
                            head of department of computing and mathematics.
                        </Typography>
                    </Box>
                </Paper>
            </Grid>

            {/* Team Member 2 */}
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            component="img"
                            src={bernard_head}
                            alt="Team Member 2"
                            sx={{
                                width: 200,
                                height: 200,
                                borderRadius: "50%",
                                mb: 2,
                                objectFit: "cover",
                            }}
                        />
                        <Typography variant="h5" gutterBottom>
                            Dr Bernard Butler
                        </Typography>
                        <Typography variant="body1" color="grey">
                            Lecturer in SETU & Supervises Researchers
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            align="center"
                            marginTop="10px"
                        >
                            AI and Machine Learning have become the source of
                            many articles and discussions. For some, they offer
                            the potential to solve the significant problems of
                            our age: climate change, antibiotic resistance and
                            human augmentation. Others take a more dystopian
                            view, citing concerns such as human displacement and
                            biased decisions. It also outlines some ways in
                            which the world of research, and of knowledge more
                            generally, is undergoing a fundamental change in
                            response to advances in AI and Machine Learning.
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    </Container>
);

const MainContent = () => (
    <Box>
        <Parallax />
        <AboutCognify />
        <TeamSection />
    </Box>
);

export default MainContent;
