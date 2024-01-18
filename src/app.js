import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//When to use app.use?
//it comes in use when you are setting middleware or configuration
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//routes import

import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);

//https://localhost:8000/api/v1/users/register  -> indsutry standard
export { app };
