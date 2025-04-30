export const logIn = async (email, password) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_NODE_API_ENDPOINT_URL}/api/users`,
            {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ email, password }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.msg || "Login failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token); // Store JWT
        return data;
    } catch (err) {
        console.error("Login error:", err.message);
        throw err;
    }
};

export const signUp = async (
    email,
    password,
    title,
    type,
    firstname,
    surname
) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_NODE_API_ENDPOINT_URL}/api/users?action=register`,
            {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                    title,
                    type,
                    firstname,
                    surname,
                }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.msg || "Signup failed");
        }

        return await response.json();
    } catch (err) {
        console.error("Signup error:", err.message);
        throw err;
    }
};

export const logOut = () => {
    localStorage.removeItem("token");
};
