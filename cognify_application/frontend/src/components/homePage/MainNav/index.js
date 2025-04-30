import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    Container,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import brainImage from "../../../images/Brain.svg";
import { useNavigate } from "react-router-dom";

const MainNav = () => {
    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    return (
        <>
            <Box>
                {/* Main Navigation Bar */}
                <AppBar position="static" color="transparent" elevation={0}>
                    <Container maxWidth="xl">
                        <Toolbar
                            sx={{
                                justifyContent: "center",
                                padding: "1rem 0",
                                minHeight: "100px !important",
                            }}
                        >
                            {/* Logo */}
                            <Box
                                component="img"
                                src={brainImage}
                                alt="Cognify Logo"
                                sx={{ height: 60, mr: 1 }}
                            />
                            <Typography
                                variant="h4"
                                sx={{
                                    color: "Black",
                                    marginRight: "30px",
                                    marginLeft: "3px",
                                }}
                            >
                                Cognify
                            </Typography>

                            {/* Desktop Navigation Links */}
                            <Box
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    gap: 4,
                                }}
                            >
                                {["HOME", "RESEARCH AREAS", "PERSONNEL"].map(
                                    (item) => (
                                        <Button
                                            key={item}
                                            sx={{
                                                color: "#666",
                                                textTransform: "none",
                                                "&:hover": {
                                                    backgroundColor:
                                                        "transparent",
                                                    color: "#000",
                                                },
                                            }}
                                            onClick={() => {
                                                if (item === "HOME") {
                                                    navigate("/"); // Navigate to home
                                                }
                                                if (item === "RESEARCH AREAS") {
                                                    navigate("/research"); // Navigate to home
                                                }
                                                if (item === "PERSONNEL") {
                                                    navigate("/aboutme"); // Navigate to home
                                                }
                                            }}
                                        >
                                            {item}
                                        </Button>
                                    )
                                )}
                            </Box>

                            {/* Mobile Hamburger Menu */}
                            <Box
                                sx={{
                                    display: { xs: "flex", md: "none" },
                                    ml: "auto",
                                }}
                            >
                                <IconButton
                                    onClick={() => toggleDrawer(true)}
                                    sx={{ color: "#666" }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>

                {/* Full-width Drawer for Mobile */}
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => toggleDrawer(false)}
                    sx={{
                        width: "100%",
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: "100%",
                            boxSizing: "border-box",
                        },
                    }}
                >
                    {/* Close Button */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton
                            onClick={() => toggleDrawer(false)}
                            sx={{ color: "#333" }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <List>
                        {[
                            "HOME",
                            "RESEARCH AREAS",
                            "RESOURCES",
                            "PERSONNEL",
                            "More",
                        ].map((item) => (
                            <ListItem
                                button
                                key={item}
                                onClick={() => toggleDrawer(false)}
                            >
                                <ListItemText
                                    primary={item}
                                    sx={{ textAlign: "center" }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
        </>
    );
};

export default MainNav;
