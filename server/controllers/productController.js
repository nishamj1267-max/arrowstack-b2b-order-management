const pool = require("../config/db");

// GET /api/products - List all products
const getProducts = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM products ORDER BY id DESC"
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            products: result.rows,
        });
    } catch (error) {
        console.error("Get products error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products",
        });
    }
};

// GET /api/products/:id - Get one product
const getProductById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        const result = await pool.query(
            "SELECT * FROM products WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            product: result.rows[0],
        });
    } catch (error) {
        console.error("Get product error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch product",
        });
    }
};

// POST /api/products - Create a product (admin only)
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description = null,
            price,
            stock_quantity,
            category = null,
            image_url = null,
        } = req.body;

        if (
            typeof name !== "string" ||
            !name.trim() ||
            price === undefined ||
            price === null ||
            price === "" ||
            !Number.isFinite(Number(price)) ||
            Number(price) < 0 ||
            stock_quantity === undefined ||
            stock_quantity === null ||
            stock_quantity === "" ||
            !Number.isInteger(Number(stock_quantity)) ||
            Number(stock_quantity) < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Valid name, non-negative price and non-negative integer stock_quantity are required",
            });
        }

        const result = await pool.query(
            `INSERT INTO products
                (name, description, price, stock_quantity, category, image_url)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [
                name.trim(),
                description,
                Number(price),
                Number(stock_quantity),
                category,
                image_url,
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: result.rows[0],
        });
    } catch (error) {
        console.error("Create product error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to create product",
        });
    }
};

// PUT /api/products/:id - Update a product (admin only)
const updateProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        const {
            name,
            description = null,
            price,
            stock_quantity,
            category = null,
            image_url = null,
        } = req.body;

        if (
            typeof name !== "string" ||
            !name.trim() ||
            price === undefined ||
            price === null ||
            price === "" ||
            !Number.isFinite(Number(price)) ||
            Number(price) < 0 ||
            stock_quantity === undefined ||
            stock_quantity === null ||
            stock_quantity === "" ||
            !Number.isInteger(Number(stock_quantity)) ||
            Number(stock_quantity) < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Valid name, non-negative price and non-negative integer stock_quantity are required",
            });
        }

        const result = await pool.query(
            `UPDATE products
             SET name = $1,
                 description = $2,
                 price = $3,
                 stock_quantity = $4,
                 category = $5,
                 image_url = $6,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $7
             RETURNING *`,
            [
                name.trim(),
                description,
                Number(price),
                Number(stock_quantity),
                category,
                image_url,
                id,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: result.rows[0],
        });
    } catch (error) {
        console.error("Update product error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to update product",
        });
    }
};

// DELETE /api/products/:id - Delete a product (admin only)
const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        const result = await pool.query(
            "DELETE FROM products WHERE id = $1 RETURNING id",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        if (error.code === "23503") {
            return res.status(409).json({
                success: false,
                message: "This product cannot be deleted because it is used in existing orders",
            });
        }

        console.error("Delete product error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to delete product",
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
