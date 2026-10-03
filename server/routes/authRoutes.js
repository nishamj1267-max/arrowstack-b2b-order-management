const express = require("express");
const { body } = require("express-validator");

const {
    registerUser,
    loginUser,
} = require("../controllers/authController");

const router = express.Router();

// User Registration
router.post(
    "/register", [
        body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

        body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),

        body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

        body("company_name")
        .optional()
        .trim(),

        body("phone")
        .optional()
        .trim()
        .isLength({ min: 10, max: 15 })
        .withMessage("Phone number must be between 10 and 15 characters"),
    ],
    registerUser
);

// User Login
router.post(
    "/login", [
        body("email")
        .trim()
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),

        body("password")
        .notEmpty()
        .withMessage("Password is required"),
    ],
    loginUser
);

module.exports = router;