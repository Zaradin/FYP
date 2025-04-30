import React, { useState, createContext, useEffect } from "react";
import { logIn, signUp } from "../auth/auth.js";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const existingToken = localStorage.getItem("token"); // Get token from localStorage
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(existingToken);
    const [Name, setName] = useState("");
    const [loading, setLoading] = useState(true);

    // Function to put JWT token in local storage.
    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    };

    const authenticate = async (email, password) => {
        const result = await logIn(email, password);
        if (result.token) {
            setToken(result.token);
            setIsAuthenticated(true);
            setName(result.fullname);
        }
    };

    const register = async (
        email,
        password,
        title,
        type,
        firstname,
        surname
    ) => {
        const result = await signUp(
            email,
            password,
            title,
            type,
            firstname,
            surname
        );
        return result.code === 201 ? true : false;
    };

    const signout = () => {
        localStorage.removeItem("token");
        setAuthToken(null);
        setIsAuthenticated(false);
        setName("");
    };

    useEffect(() => {
        if (existingToken) {
            setIsAuthenticated(true);
            setAuthToken(existingToken);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    }, [existingToken]);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                loading,
                authenticate,
                register,
                signout,
                Name,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
