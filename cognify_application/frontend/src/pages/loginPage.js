import React from "react";
import Login from "../components/login";
import ParticlesComponent from "../components/particles/particles";
import { Box, Container } from "@mui/material"; // Import MUI components

const LoginPage = () => {
    return (
        <Box sx={{ position: "relative", height: "100vh" }}>
            {/* Particles background */}
            <ParticlesComponent />

            {/* Login form */}
            <Container
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                    width: "100%",
                    maxWidth: "400px", // Optional: adjust the max width of the form
                }}
            >
                <Login />
            </Container>
        </Box>
    );
};

export default LoginPage;
