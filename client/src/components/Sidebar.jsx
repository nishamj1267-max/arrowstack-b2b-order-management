import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>ArrowStack</h2>

      <Link to="/dashboard">🏠 Dashboard</Link>
      <Link to="/products">📦 Products</Link>
      <Link to="/cart">🛒 Cart</Link>
      <Link to="/orders">📋 Orders</Link>
      <Link to="/admin">⚙️ Admin</Link>
    </div>
  );
}

export default Sidebar;