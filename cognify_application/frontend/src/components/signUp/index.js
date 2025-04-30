import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Link,
    MenuItem,
} from "@mui/material";
import { signUp } from "../../auth/auth";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import brainImage from "../../images/Brain.svg";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../contexts/snackbarContext";

const Signup = () => {
    const { showSnackbar } = useSnackbar();

    const [title, setTitle] = useState("");
    const [accountType, setAccountType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (
            !email ||
            !password ||
            !confirmPassword ||
            !firstName ||
            !lastName
        ) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // try create account
        try {
            await signUp(
                email,
                password,
                title,
                accountType,
                firstName,
                lastName
            );
            navigate("/login");
            showSnackbar("Account created successfully!", "success");
        } catch (error) {
            setError(error.message);
            showSnackbar("Sign-up failed: Please try again!", "error");
        }
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
                onSubmit={handleSignup}
                sx={{
                    width: 320,
                    p: 3,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "#fff",
                }}
            >
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
                        sx={{ height: 60, marginRight: 1 }}
                    />
                    <Typography
                        variant="h4"
                        sx={{ color: "black", marginLeft: 1 }}
                    >
                        Cognify
                    </Typography>
                </Box>

                <Typography variant="h5" mb={2} textAlign="center">
                    Sign Up
                </Typography>

                {error && (
                    <Typography color="error" mb={2} textAlign="center">
                        {error}
                    </Typography>
                )}

                <TextField
                    select
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                >
                    <MenuItem value="Mr">Mr</MenuItem>
                    <MenuItem value="Ms">Ms</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                    <MenuItem value="Dr">Dr</MenuItem>
                </TextField>

                <TextField
                    select
                    label="Account Type"
                    fullWidth
                    margin="normal"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                >
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Researcher">Researcher</MenuItem>
                    <MenuItem value="Geriatrician">Geriatrician</MenuItem>
                    <MenuItem value="Physician">Physician</MenuItem>
                    <MenuItem value="Neurosurgeon">Neurosurgeon</MenuItem>
                </TextField>

                <Box display="flex" gap={1}>
                    <TextField
                        label="First Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </Box>

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

                <TextField
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    edge="end"
                                >
                                    {showConfirmPassword ? (
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
                    Sign Up
                </Button>

                <Box mt={3} textAlign="center">
                    <Typography variant="body2">
                        Already have an account?{" "}
                        <Link
                            onClick={() => navigate("/login")}
                            sx={{ cursor: "pointer", color: "#1976d2" }}
                        >
                            Login here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Signup;
