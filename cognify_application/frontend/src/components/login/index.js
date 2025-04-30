import { useContext, useState } from "react";
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { AuthContext } from "../../contexts/authContext.js";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import brainImage from "../../images/Brain.svg";
import { useSnackbar } from "../../contexts/snackbarContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const context = useContext(AuthContext);

    const { showSnackbar } = useSnackbar();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("All fields are required");
            return;
        }
        try {
            await context.authenticate(email, password);
            navigate("/dashboard");
            showSnackbar("Logged in successfully!", "success");
        } catch (error) {
            console.error("Login failed:", error.message);
            setError(error.message);
            showSnackbar("Login failed: Please try again!", "error");
        }
    };

    const handleSignupRedirect = () => {
        navigate("/signup"); // Redirect to the signup page (adjust path as needed)
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            position="relative"
        >
            {/* Close Button (Top Right) */}
            <IconButton
                onClick={() => navigate("/")}
                sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                }}
            >
                <Close />
            </IconButton>
            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    width: 320,
                    p: 3,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "#fff",
                }}
            >
                {/* Logo and Company Name inside the box */}
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ marginBottom: 3 }}
                >
                    <Box
                        component="img"
                        src={brainImage}
                        alt="Cognify Logo"
                        sx={{
                            height: 60,
                            marginRight: 1, // Space between logo and text
                        }}
                    />
                    <Typography
                        variant="h4"
                        sx={{
                            color: "black",
                            marginLeft: 1,
                        }}
                    >
                        Cognify
                    </Typography>
                </Box>

                <Typography variant="h5" mb={2} textAlign="center">
                    Login
                </Typography>

                {error && (
                    <Typography color="error" mb={2} textAlign="center">
                        {error}
                    </Typography>
                )}

                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>

                {/* Signup link */}
                <Box mt={2} textAlign="center">
                    <Typography variant="body2">
                        Don't have an account?{" "}
                        <Button
                            onClick={handleSignupRedirect}
                            sx={{
                                textTransform: "none",
                                padding: 0,
                                color: "primary.main",
                            }}
                        >
                            Signup here
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
