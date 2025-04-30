import React from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Container,
    Chip,
    Avatar,
} from "@mui/material";
import josh_head from "../../../images/josh-head.jpg";
//import setu_image from "../../../images/MONO_BLACK.png";
import personal_background from "../../../images/personal_background.jpg";

// Parallax Header Component
const Parallax = () => (
    <Box
        sx={{
            height: "45vh",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${personal_background})`,
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
        <Grid container sx={{ zIndex: 1, width: "100%", maxWidth: "1200px" }}>
            {/* Left Column (Image) */}
            <Grid
                item
                xs={12}
                md={4}
                sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "flex-end",
                    alignItems: "center",
                    pr: 4,
                }}
            >
                <Avatar
                    src={josh_head}
                    alt="Josh Crotty"
                    sx={{
                        width: 200,
                        height: 200,
                        border: "4px solid white",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    }}
                />
            </Grid>

            {/* Right Column (Text) */}
            <Grid
                item
                xs={12}
                md={8}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: { xs: "center", md: "flex-start" },
                    pl: { xs: 2, md: 4 },
                    pr: { xs: 2, md: 0 },
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        color: "white",
                        textAlign: { xs: "center", md: "left" },
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                        fontWeight: 600,
                    }}
                >
                    Josh Crotty
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        color: "white",
                        textAlign: { xs: "center", md: "left" },
                        marginTop: "10px",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                    }}
                >
                    Software Developer & Machine Learning Enthusiast
                </Typography>
            </Grid>
        </Grid>
    </Box>
);

// About Me Section
const AboutMe = () => (
    <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
            variant="h3"
            component="h2"
            sx={{
                textAlign: "center",
                mb: 3,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                letterSpacing: "0.5px",
            }}
        >
            About Me
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
            I'm currently completing my degree in Software Systems Development
            at South East Technological University (SETU) in Co. Waterford.
            Throughout my academic journey, I've developed a strong foundation
            in various aspects of software development and computer science.
            {"\n\n"}
            I've had the opportunity to serve as the Student Representative for
            my course, acting as the primary liaison between students and
            faculty, including the course head and the head of department of
            computing and mathematics. This role has helped me develop strong
            communication and leadership skills alongside my technical
            education.
            {"\n\n"}
            I'm excited to announce that I'll be pursuing a Master's degree in
            Mathematical Modelling and Machine Learning at University College
            Cork (UCC) starting September 2025. This next step in my academic
            journey reflects my passion for applying computational methods to
            solve complex problems.
        </Typography>
    </Container>
);

// Education Section
const Education = () => (
    <Box sx={{ bgcolor: "#f5f5f5", py: 8 }}>
        <Container maxWidth="lg">
            <Typography
                variant="h3"
                component="h2"
                sx={{
                    textAlign: "center",
                    mb: 3,
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                }}
            >
                Education
            </Typography>

            <Grid container spacing={4}>
                {/* Current Education */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4, height: "80%" }}>
                        <Typography variant="h5" gutterBottom fontWeight={600}>
                            BSc (Hons) in Software Systems Development
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                            South East Technological University (SETU)
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            2021 - 2025
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Completing my final year in Software Systems
                            Development, focusing on building practical software
                            engineering skills and theoretical computer science
                            knowledge.
                        </Typography>
                    </Paper>
                </Grid>

                {/* Future Education */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4, height: "80%" }}>
                        <Typography variant="h5" gutterBottom fontWeight={600}>
                            MSc in Mathematical Modelling and Machine Learning
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                            University College Cork (UCC)
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Starting September 2025
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Looking forward to deepening my knowledge in
                            mathematical modeling and machine learning
                            techniques, with a focus on applying computational
                            methods to real-world problems.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Box>
);

// Favorite Modules Section
const FavoriteModules = () => (
    <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
            variant="h3"
            component="h2"
            sx={{
                textAlign: "center",
                mb: 3,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                letterSpacing: "0.5px",
            }}
        >
            Favorite Modules
        </Typography>

        <Grid container spacing={3}>
            {/* Module 1 */}
            <Grid item xs={12} sm={6} md={3}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        height: "80%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s",
                        "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: 6,
                        },
                    }}
                >
                    <Typography
                        variant="h5"
                        gutterBottom
                        color="primary"
                        fontWeight={500}
                    >
                        Networks
                    </Typography>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        Learning about network protocols, architecture, and
                        security has given me a deep understanding of how
                        systems communicate and exchange data in modern
                        computing environments.
                    </Typography>
                </Paper>
            </Grid>

            {/* Module 2 */}
            <Grid item xs={12} sm={6} md={3}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        height: "80%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s",
                        "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: 6,
                        },
                    }}
                >
                    <Typography
                        variant="h5"
                        gutterBottom
                        color="primary"
                        fontWeight={500}
                    >
                        Computer Security
                    </Typography>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        This module sparked my interest in cybersecurity
                        principles, encryption techniques, and secure software
                        development practices essential in today's technology
                        landscape.
                    </Typography>
                </Paper>
            </Grid>

            {/* Module 3 */}
            <Grid item xs={12} sm={6} md={3}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        height: "80%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s",
                        "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: 6,
                        },
                    }}
                >
                    <Typography
                        variant="h5"
                        gutterBottom
                        color="primary"
                        fontWeight={500}
                    >
                        Web App Development
                    </Typography>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        Creating dynamic, responsive web applications taught me
                        valuable skills in frontend and backend technologies,
                        RESTful APIs, and modern JavaScript frameworks.
                    </Typography>
                </Paper>
            </Grid>

            {/* Module 4 */}
            <Grid item xs={12} sm={6} md={3}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        height: "80%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s",
                        "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: 6,
                        },
                    }}
                >
                    <Typography
                        variant="h5"
                        gutterBottom
                        color="primary"
                        fontWeight={500}
                    >
                        Data Science
                    </Typography>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        Exploring data analysis, visualization, and machine
                        learning algorithms has prepared me for my future
                        studies and sparked my interest in computational
                        approaches to problem-solving.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    </Container>
);

// Skills Section
const Skills = () => (
    <Box sx={{ bgcolor: "#f5f5f5", py: 8 }}>
        <Container maxWidth="lg">
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
                Technical Skills
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Grid container spacing={1}>
                            {/* Programming Languages */}
                            <Grid item xs={12} sx={{ mb: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Programming Languages
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                    }}
                                >
                                    {[
                                        "JavaScript",
                                        "Python",
                                        "Java",
                                        "C",
                                        "HTML/CSS",
                                        "SQL",
                                        "Kotlin",
                                    ].map((skill) => (
                                        <Chip
                                            key={skill}
                                            label={skill}
                                            color="primary"
                                            sx={{ m: 0.5 }}
                                        />
                                    ))}
                                </Box>
                            </Grid>

                            {/* Frameworks & Libraries */}
                            <Grid item xs={12} sx={{ mb: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Frameworks & Libraries
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                    }}
                                >
                                    {[
                                        "React",
                                        "Node.js",
                                        "Express",
                                        "MongoDB",
                                        "Scikit-learn",
                                        "Pytorch",
                                        "Bootstrap",
                                        "Material UI",
                                    ].map((skill) => (
                                        <Chip
                                            key={skill}
                                            label={skill}
                                            color="secondary"
                                            sx={{ m: 0.5 }}
                                        />
                                    ))}
                                </Box>
                            </Grid>

                            {/* Tools & Technologies */}
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>
                                    Tools & Technologies
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                    }}
                                >
                                    {[
                                        "Git",
                                        "Docker",
                                        "AWS",
                                        "RESTful APIs",
                                        "Agile/Scrum",
                                        "Linux",
                                        "Notebooks",
                                        "Jupyter Lab",
                                    ].map((skill) => (
                                        <Chip
                                            key={skill}
                                            label={skill}
                                            color="default"
                                            sx={{ m: 0.5 }}
                                        />
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Box>
);

// Main Content Component
const AboutPageContent = () => (
    <Box>
        <Parallax />
        <AboutMe />
        <Education />
        <FavoriteModules />
        <Skills />
    </Box>
);

export default AboutPageContent;
