import jwt from "jsonwebtoken";
import User from "../api/users/userModel.js";

export const authenticate = async (request, response, next) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new Error("No authorization header");

        const token = authHeader.split(" ")[1];
        if (!token) throw new Error("Bearer token not found");

        const decoded = await jwt.verify(token, process.env.SECRET);

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            throw new Error("User not found");
        }
        // Attach the user to the request object
        request.user = user;
        next();
    } catch (err) {
        next(new Error(`Verification Failed: ${err.message}`));
    }
};

// Register a new user
export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check for existing user by email
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ error: "Email already in use" });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();

        // Generate JWT
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.SECRET,
            { expiresIn: "1h" }
        );
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login an existing user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ error: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default authenticate;
