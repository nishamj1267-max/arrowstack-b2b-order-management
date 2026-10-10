const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/adminMiddleware");

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin-only routes
router.post("/", authenticateToken, requireAdmin, createProduct);
router.put("/:id", authenticateToken, requireAdmin, updateProduct);
router.delete("/:id", authenticateToken, requireAdmin, deleteProduct);

module.exports = router;
