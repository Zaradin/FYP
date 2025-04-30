import { Box, Container, Typography } from "@mui/material";

const Footer = () => (
    <Box
        sx={{
            bgcolor: "#333",
            color: "#f2faff",
            py: 3, // Padding for spacing
            mt: 5, // Margin-top for separation
            textAlign: "center",
        }}
    >
        <Container maxWidth="xl">
            <Typography variant="body2">
                © {new Date().getFullYear()} Cognify. All Rights Reserved.
            </Typography>
            <Typography variant="body2">
                South East Technological University | Cork Rd, Kilbarry,
                Waterford, Ireland
            </Typography>
        </Container>
    </Box>
);

export default Footer;
