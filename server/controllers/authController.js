const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const pool = require("../config/db");

// User Registration
const registerUser = async(req, res) => {
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
        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1", [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered",
            });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

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

// User Login
const loginUser = async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array(),
        });
    }

    const { email, password } = req.body;

    try {
        // Find user by email
        const result = await pool.query(
            `SELECT id, name, company_name, email, phone, password_hash, role
             FROM users
             WHERE email = $1`, [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const user = result.rows[0];

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate JWT token
        const token = jwt.sign({
                userId: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET, {
                expiresIn: "1d",
            }
        );

        // Remove password hash before sending response
        delete user.password_hash;

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error during login",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};