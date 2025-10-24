import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectionRoutes from "./routes/connectionRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using the connectDB function
connectDB();

const app = express();

// Enable CORS to allow frontend to communicate with backend
app.use(cors({
  origin: process.env.FRONTEND_URL || "*" // allow all origins if FRONTEND_URL not set
}));

// Parse incoming JSON requests
app.use(express.json());

// Routes for authentication, user management, and connections
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/connections", connectionRoutes);

// Start the server on the specified PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
