import React from "react";
import Signup from "../components/signUp";
import ParticlesComponent from "../components/particles/particles";
import { Box, Container } from "@mui/material";

const SignUpPage = () => {
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
                    maxWidth: "400px",
                }}
            >
                <Signup />
            </Container>
        </Box>
    );
};

export default SignUpPage;
