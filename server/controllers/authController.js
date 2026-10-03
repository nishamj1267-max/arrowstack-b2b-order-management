const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const pool = require("../config/db");

const registerUser = async(req, res) => {
    // Check validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array(),
        });
    }

    const {
        name,
        company_name,
        email,
        phone,
        password,
    } = req.body;

    try {
        // Check if email already exists
        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1", [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered",
            });
        }

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Create user
        const result = await pool.query(
            `INSERT INTO users
            (name, company_name, email, phone, password_hash)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name, company_name, email, phone, role, created_at`, [
                name,
                company_name || null,
                email,
                phone || null,
                passwordHash,
            ]
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: result.rows[0],
        });
    } catch (error) {
        console.error("Registration error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error during registration",
        });
    }
};

module.exports = {
    registerUser,
};