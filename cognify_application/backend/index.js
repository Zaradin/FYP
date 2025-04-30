import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usersRouter from "./api/users/index.js";
import cognifyRouter from "./api/cognify/index.js";
import "./db/index.js";
import defaultErrHandler from "./errHandler/index.js";
import authenticate from "./authenticate/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/", authenticate, cognifyRouter);

app.use(defaultErrHandler);

app.listen(port, () => {
    console.info(`Server running at ${port}`);
});
