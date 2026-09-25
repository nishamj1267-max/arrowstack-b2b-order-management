
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Orders() {
  const orders = [
    { id: "ORD-1001", customer: "ABC Traders", date: "25 Sep 2026", amount: "₹25,000", status: "Delivered", progress: 100 },
    { id: "ORD-1002", customer: "Shree Enterprises", date: "23 Sep 2026", amount: "₹12,500", status: "Shipped", progress: 75 },
    { id: "ORD-1003", customer: "Tech Solutions", date: "20 Sep 2026", amount: "₹8,900", status: "Processing", progress: 40 },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-body">
          <div className="orders-header">
            <div>
              <h1>My Orders</h1>
              <p>Track and manage your recent purchases.</p>
            </div>

            <button className="filter-btn">This Month</button>
          </div>

          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-item" key={order.id}>
                <div className="order-left">
                  <div className="order-icon">📦</div>

                  <div>
                    <h3>{order.id}</h3>
                    <p>{order.customer}</p>
                    <small>{order.date}</small>
                  </div>
                </div>

                <div className="order-middle">
                  <span className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>

                  <div className="mini-progress">
                    <div
                      className="mini-fill"
                      style={{ width: `${order.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="order-right">
                  <h3>{order.amount}</h3>
                  <button className="invoice-btn">Invoice</button>
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