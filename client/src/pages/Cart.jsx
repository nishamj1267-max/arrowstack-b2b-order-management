
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);

  const formatPrice = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in before placing your order.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            product_id: Number(item.id),
            quantity: Number(item.qty),
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to place order.");
      }

      clearCart();

      alert(
        `Order placed successfully!\nOrder ID: ${data.order.id}\nTotal: ${formatPrice(data.order.total_amount)}`
      );
    } catch (error) {
      alert(error.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-body">
          <h1>Shopping Cart</h1>

          <p className="dashboard-subtitle">
            Review your selected products before checkout.
          </p>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <h2>Your cart is empty</h2>
              <p>You haven't added any products to your cart yet.</p>

              <Link to="/products" className="checkout-btn">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-card" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.style.visibility = "hidden";
                      }}
                    />

                    <div className="cart-info">
                      <h3>{item.name}</h3>
                      <p>{item.category}</p>
                      <span>{formatPrice(item.price)}</span>
                    </div>

                    <div className="qty-box">
                      <button
                        type="button"
                        onClick={() => decreaseQty(item.id)}
                        disabled={item.qty <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>

                      <span>{item.qty}</span>

                      <button
                        type="button"
                        onClick={() => increaseQty(item.id)}
                        disabled={item.qty >= item.stock_quantity}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>

              <div className="summary-card">
                <h2>Order Summary</h2>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="summary-row">
                  <span>GST (18%)</span>
                  <span>{formatPrice(gst)}</span>
                </div>

                <hr />

                <div className="summary-total">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <button
                  type="button"
                  className="checkout-btn"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? "Placing Order..." : "Proceed to Checkout"}
                </button>

                <Link to="/products" className="continue-shopping">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
