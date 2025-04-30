import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function DynamicBreadcrumbs() {
    const location = useLocation();

    const pathnames = location.pathname.split("/").filter(Boolean);
    const breadcrumbItems = pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return {
            label: value.charAt(0).toUpperCase() + value.slice(1),
            path: to,
        };
    });

    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
                marginTop: 1,
                marginBottom: 2,
            }}
        >
            <Link to="/" style={{ textDecoration: "none" }}>
                <Typography color="text.primary">Home</Typography>
            </Link>
            {breadcrumbItems.map(({ label, path }) => (
                <Link key={path} to={path} style={{ textDecoration: "none" }}>
                    <Typography
                        color={
                            location.pathname === path
                                ? "primary"
                                : "text.primary"
                        }
                        sx={{
                            fontWeight:
                                location.pathname === path ? "bold" : "normal",
                            color: "Black",
                        }}
                    >
                        {label}
                    </Typography>
                </Link>
            ))}
        </Breadcrumbs>
    );
}

export default DynamicBreadcrumbs;
