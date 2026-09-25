
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Cart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Dell Laptop",
      category: "Electronics",
      price: 55000,
      qty: 1,
      image: "https://picsum.photos/120?1",
    },
    {
      id: 2,
      name: "Wireless Mouse",
      category: "Accessories",
      price: 1200,
      qty: 2,
      image: "https://picsum.photos/120?2",
    },
  ]);

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

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

          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-card" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                    <span>₹{item.price.toLocaleString()}</span>
                  </div>

                  <div className="qty-box">
                    <button onClick={() => decreaseQty(item.id)}>
                      −
                    </button>

                    <span>{item.qty}</span>

                    <button onClick={() => increaseQty(item.id)}>
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
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
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="summary-row">
                <span>GST (18%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>

              <hr />

              <div className="summary-total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;