import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from 'url';

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "5mb" })); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/health", (req, res) => {
    res.status(200).send("OK");
});


if (process.env.NODE_ENV === "production") {
    // 1. We go UP one level from 'backend' to reach the root (..), 
    // then into 'frontend/dist'
    const frontendDistPath = path.resolve(__dirname, "..", "frontend", "dist");

    app.use(express.static(frontendDistPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendDistPath, "index.html"), (err) => {
            if (err) {
                // If it fails, this message will help us see exactly what path failed
                res.status(404).send("Front-end build not found at: " + frontendDistPath);
            }
        });
    });
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});