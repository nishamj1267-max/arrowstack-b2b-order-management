
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

function Dashboard() {
  const recentOrders = [
    {
      id: "ORD-1001",
      customer: "ABC Traders",
      amount: "₹25,000",
      status: "Completed",
    },
    {
      id: "ORD-1002",
      customer: "Shree Enterprises",
      amount: "₹12,500",
      status: "Pending",
    },
    {
      id: "ORD-1003",
      customer: "Tech Solutions",
      amount: "₹41,000",
      status: "Completed",
    },
    {
      id: "ORD-1004",
      customer: "City Mart",
      amount: "₹8,900",
      status: "Cancelled",
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-body">
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's your business overview.
          </p>

          {/* Stats Cards */}
          <div className="cards-grid">
            <Card title="Total Orders" value="120" />
            <Card title="Products" value="45" />
            <Card title="Customers" value="82" />
            <Card title="Revenue" value="₹2.4L" />
          </div>

          {/* Recent Orders */}
          <div className="orders-card">
            <h2>Recent Orders</h2>

            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.amount}</td>
                    <td>
                      <span
                        className={`status ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;