import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
//import Spinner from "../spinner";

const ProtectedRoutes = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    // if (loading) {
    //     return <Spinner />;
    // }

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default ProtectedRoutes;
