const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");

const app = express();


// -------------------------
// Built-in Middleware
// -------------------------

app.use(express.json());


// -------------------------
// CORS Middleware
// -------------------------

app.use(
    cors({
        origin: "http://localhost:3000"
    })
);


// -------------------------
// Rate Limiting Middleware
// -------------------------

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {
        success: false,
        message: "Too many requests, please try again later."
    }
});

app.use(limiter);


// -------------------------
// Logging Middleware
// -------------------------

app.use(logger);


// -------------------------
// Routes
// -------------------------

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Middleware Pipeline API is running"
    });
});

app.use("/users", userRoutes);


// -------------------------
// 404 Handler
// -------------------------

app.use((req, res, next) => {
    const AppError = require("./errors/AppError");

    next(new AppError("Route not found", 404));
});


// -------------------------
// Central Error Handler
// -------------------------

app.use(errorHandler);


module.exports = app;