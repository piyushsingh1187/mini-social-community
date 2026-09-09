const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Mini Social API is running"
    });
});

module.exports = app;