import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useLocation, useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSnackbar } from "../../contexts/snackbarContext";
import brainImageWhite from "../../images/Brain-white.svg";
import { AuthContext } from "../../contexts/authContext";

const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Patients", icon: <PeopleIcon />, path: "/patients" },
    { text: "Reports", icon: <AssignmentIcon />, path: "/reports" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

function AppNav() {
    const { showSnackbar } = useSnackbar();

    const [user, setUser] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const drawerWidth = 240;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { signout } = useContext(AuthContext);

    const handleSignOut = () => {
        signout();
        showSnackbar("Logged out successfully!", "success");
        navigate("/login");
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            console.log("Retrieved Token:", token); // Debug: Check if the token is correctly retrieved from localStorage

            if (token) {
                try {
                    console.log("Making request to fetch user details...");

                    const userDetailsResponse = await fetch(
                        `${process.env.REACT_APP_NODE_API_ENDPOINT_URL}/api/users/userdetails`,
                        {
                            headers: {
                                Authorization: `${token}`,
                            },
                        }
                    );

                    console.log("Response status:", userDetailsResponse.status); // Debug: Check the response status

                    if (userDetailsResponse.ok) {
                        const data = await userDetailsResponse.json();
                        console.log("User details fetched:", data); // Debug: Check the user data returned from the API
                        setUser(data); // Update user state with fetched user details
                    } else {
                        console.error(
                            "Failed to fetch user details:",
                            userDetailsResponse.statusText
                        );
                    }
                } catch (err) {
                    console.error("Error fetching user details:", err);
                }
            } else {
                console.error("No token found in localStorage");
            }
        };

        fetchUser();
    }, []); // Empty dependency array to fetch only once when the component mounts

    if (!user) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Typography>Loading user details...</Typography>
            </Box>
        );
    }

    console.log("USER " + JSON.stringify(user));

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    bgcolor: "#333",
                }}
                color="primary"
            >
                <Toolbar
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    {/* Logo and Title */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                            component="img"
                            src={brainImageWhite}
                            alt="Cognify Logo"
                            sx={{ height: 50, mr: 1 }}
                        />
                        <Typography variant="h4" sx={{ color: "white", ml: 1 }}>
                            Cognify
                        </Typography>
                    </Box>

                    {/* User Avatar & Dropdown */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                borderColor: "rgba(255, 255, 255, 0.2)", // Custom color
                                borderWidth: "1.8px",
                            }}
                        />
                        <Button
                            onClick={handleMenuOpen}
                            sx={{
                                textTransform: "none",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {/* User Info: Name & Role */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {user.title}. {user.firstname}{" "}
                                    {user.surname}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "lightgray" }}
                                >
                                    {user.type}
                                </Typography>
                            </Box>
                            <Avatar
                                sx={{
                                    bgcolor: deepPurple[500],
                                    width: 35,
                                    height: 35,
                                    mr: 1,
                                    ml: 3,
                                }}
                            >
                                {user.firstname.charAt(0)}
                                {user.surname.charAt(0)}
                            </Avatar>
                            <ExpandMoreIcon />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <MenuItem onClick={handleMenuClose}>
                                Account Settings
                            </MenuItem>
                            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    {/* Primary List */}
                    <List>
                        {menuItems.map(({ text, icon, path }) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton
                                    onClick={() => navigate(path)}
                                    sx={{
                                        backgroundColor:
                                            location.pathname.startsWith(path)
                                                ? "#f0f0f0"
                                                : "inherit",
                                    }}
                                >
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default AppNav;
