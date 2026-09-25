
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Products() {
  const products = [
    {
      id: 1,
      name: "Dell Laptop",
      category: "Electronics",
      price: "₹55,000",
      stock: 12,
      image: "https://picsum.photos/300/200?random=1",
    },
    {
      id: 2,
      name: "Wireless Mouse",
      category: "Accessories",
      price: "₹1,200",
      stock: 35,
      image: "https://picsum.photos/300/200?random=2",
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      category: "Accessories",
      price: "₹3,500",
      stock: 8,
      image: "https://picsum.photos/300/200?random=3",
    },
    {
      id: 4,
      name: "Office Chair",
      category: "Furniture",
      price: "₹7,800",
      stock: 5,
      image: "https://picsum.photos/300/200?random=4",
    },
    {
      id: 5,
      name: "Monitor 24 Inch",
      category: "Electronics",
      price: "₹12,000",
      stock: 20,
      image: "https://picsum.photos/300/200?random=5",
    },
    {
      id: 6,
      name: "Printer",
      category: "Electronics",
      price: "₹8,500",
      stock: 9,
      image: "https://picsum.photos/300/200?random=6",
    },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        <div className="dashboard-body">
          <h1>Products</h1>
          <p className="dashboard-subtitle">
            Browse and manage available products.
          </p>

          <div className="product-toolbar">
            <input
              type="text"
              placeholder="Search products..."
              className="search-box"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Furniture</option>
            </select>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />

                <h3>{product.name}</h3>

                <p className="category">{product.category}</p>

                <div className="product-bottom">
                  <span className="price">{product.price}</span>
                  <span className="stock">
                    Stock: {product.stock}
                  </span>
                </div>

                <button className="add-cart-btn">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;