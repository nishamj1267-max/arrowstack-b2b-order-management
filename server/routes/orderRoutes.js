
const express = require("express");
const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const items = req.body.items;
  const userId = req.user.userId;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart is empty.",
    });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let subtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const productId = Number(item.product_id);
      const quantity = Number(item.quantity);

      if (
        !Number.isInteger(productId) ||
        productId <= 0 ||
        !Number.isInteger(quantity) ||
        quantity <= 0
      ) {
        throw new Error("Invalid product or quantity.");
      }

      const result = await client.query(
        `SELECT id, name, price, stock_quantity
         FROM products
         WHERE id = $1
         FOR UPDATE`,
        [productId]
      );

      if (result.rows.length === 0) {
        throw new Error("A product was not found.");
      }

      const product = result.rows[0];

      if (quantity > Number(product.stock_quantity)) {
        throw new Error(
          `Insufficient stock for ${product.name}.`
        );
      }

      const price = Number(product.price);
      const itemSubtotal = price * quantity;
      subtotal += itemSubtotal;

      verifiedItems.push({
        productId,
        quantity,
        price,
        itemSubtotal,
      });

      await client.query(
        `UPDATE products
         SET stock_quantity = stock_quantity - $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2`,
        [quantity, productId]
      );
    }

    const gst = Math.round(subtotal * 0.18 * 100) / 100;
    const total = subtotal + gst;

    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, status)
       VALUES ($1, $2, 'pending')
       RETURNING id, total_amount, status, created_at`,
      [userId, total]
    );

    const order = orderResult.rows[0];

    for (const item of verifiedItems) {
      await client.query(
        `INSERT INTO order_items
         (order_id, product_id, quantity, unit_price, subtotal)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          order.id,
          item.productId,
          item.quantity,
          item.price,
          item.itemSubtotal,
        ]
      );
    }

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Order creation error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "Unable to place order.",
    });
  } finally {
    client.release();
  }
});

module.exports = router;
