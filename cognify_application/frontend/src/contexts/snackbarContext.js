import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [snackbars, setSnackbars] = useState([]);

    // Function to show a new snackbar
    // severity can be "success", "error", "warning", "info"
    const showSnackbar = (message, severity = "info", duration = 3000) => {
        setSnackbars((prev) => [
            ...prev,
            { id: Date.now(), message, severity, duration },
        ]);
    };

    // Function to close a specific snackbar
    const handleClose = (id, reason) => {
        if (reason === "clickaway") {
            return; // Prevents closing when clicking outside the snackbar i.e. snackbar only goes from duration expiry or with the snackbar close button
        }
        setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}

            {/* Render multiple stacked snackbars */}
            {snackbars.map(({ id, message, severity, duration }, index) => (
                <Snackbar
                    key={id}
                    open={true}
                    autoHideDuration={duration}
                    onClose={(event, reason) => handleClose(id, reason)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    sx={{
                        transform: `translateY(-${index * 60}px)`, // Moves each snackbar up
                        transition: "transform 0.3s ease-in-out",
                    }}
                >
                    <Alert
                        onClose={() => handleClose(id)}
                        severity={severity}
                        variant="filled"
                    >
                        {message}
                    </Alert>
                </Snackbar>
            ))}
        </SnackbarContext.Provider>
    );
};

// Custom Hook
export const useSnackbar = () => useContext(SnackbarContext);
