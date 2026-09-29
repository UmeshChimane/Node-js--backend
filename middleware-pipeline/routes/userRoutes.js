const express = require("express");
const AppError = require("../errors/AppError");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Users fetched successfully"
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    if (id === "0") {
        throw new AppError("User not found", 404);
    }

    res.json({
        success: true,
        message: `User ${id} found`
    });
});

module.exports = router;