
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Admin() {
  const [search, setSearch] = useState("");

  const products = [
    { id: "P001", name: "Dell Laptop", category: "Electronics", stock: 12, price: "₹55,000" },
    { id: "P002", name: "Wireless Mouse", category: "Accessories", stock: 35, price: "₹1,200" },
    { id: "P003", name: "Keyboard", category: "Accessories", stock: 8, price: "₹3,500" },
    { id: "P004", name: "Office Chair", category: "Furniture", stock: 5, price: "₹7,800" },
  ];

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-body">
          <div className="admin-header">
            <div>
              <h1>Inventory Management</h1>
              <p>Manage products, stock and pricing.</p>
            </div>

            <button className="add-product-btn">+ Add Product</button>
          </div>

          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search products..."
              className="admin-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-card">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>

                    <td>
                      <span className="stock-pill">
                        {item.stock} Units
                      </span>
                    </td>

                    <td>{item.price}</td>

                    <td className="action-buttons">
                      <button className="edit-btn">✏️</button>
                      <button className="delete-btn">🗑️</button>
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

export default Admin;