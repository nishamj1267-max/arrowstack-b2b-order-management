
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Orders() {
  const orders = [
    {
      id: "ORD-1001",
      date: "25 Sep 2026",
      amount: "₹25,000",
      status: "Delivered",
      progress: 100,
    },
    {
      id: "ORD-1002",
      date: "23 Sep 2026",
      amount: "₹12,500",
      status: "Shipped",
      progress: 75,
    },
    {
      id: "ORD-1003",
      date: "20 Sep 2026",
      amount: "₹8,900",
      status: "Processing",
      progress: 40,
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-body">
          <h1>My Orders</h1>
          <p className="dashboard-subtitle">
            Track your recent orders and invoices.
          </p>

          <div className="orders-grid">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-header">
                  <div>
                    <h3>{order.id}</h3>
                    <p>{order.date}</p>
                  </div>

                  <span
                    className={`order-badge ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="progress-area">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${order.progress}%` }}
                    ></div>
                  </div>

                  <small>{order.progress}% Completed</small>
                </div>

                <div className="order-footer">
                  <div>
                    <span>Total</span>
                    <h2>{order.amount}</h2>
                  </div>

                  <button className="invoice-btn">
                    📄 Download Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;