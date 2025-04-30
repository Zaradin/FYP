import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    Container,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
    const navigate = useNavigate();

    return (
        <>
            <Box>
                {/* Top Dark Bar */}
                <AppBar position="static" sx={{ bgcolor: "#333" }}>
                    <Container maxWidth="xl">
                        <Toolbar sx={{ minHeight: "70px !important" }}>
                            {/* Address Section */}
                            <Typography
                                variant="body2"
                                sx={{ flexGrow: 1, fontSize: "0.8rem" }}
                            >
                                South East Technological University
                                <br />
                                Cork Rd, Kilbarry, Waterford, Ireland
                            </Typography>

                            {/* Right Side Icons/Buttons */}
                            <Box>
                                <Button
                                    startIcon={<PersonIcon />}
                                    sx={{
                                        color: "#f2faff",
                                        textTransform: "none",
                                        fontSize: "1rem",
                                    }}
                                    onClick={() => navigate("/login")}
                                >
                                    Log In
                                </Button>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </>
    );
};

export default TopNav;
