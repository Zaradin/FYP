import { Box, Toolbar, Divider } from "@mui/material";
import AppNav from "../appNav/index";
import DynamicBreadcrumbs from "../breadcrumbs/index";
import { Outlet } from "react-router-dom";

// This layout component is used in conjuction with applications top nav and side drawer nav
// important to note that this is only for the application after logging in.
// Using this you don't have to worry about importing the nav for each new (protected) page created so long as
// the rotue is within the layout outlet in App.js

const Layout = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <AppNav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <DynamicBreadcrumbs />
                <Divider sx={{ marginBottom: 4 }} />
                <Outlet /> {/* This renders the child route (page content) */}
            </Box>
        </Box>
    );
};

export default Layout;
