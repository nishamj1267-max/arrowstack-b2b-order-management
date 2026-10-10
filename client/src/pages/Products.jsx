
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:5000/api/products";

function Products() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load products.");
        }

        setProducts(
          Array.isArray(data.products) ? data.products : []
        );
      } catch (err) {
        setError(
          err.message || "Unable to connect to the products API."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  const filteredProducts = products.filter((product) => {
    const matchSearch = (product.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const handleAddToCart = (product) => {
    if (Number(product.stock_quantity) <= 0) {
      setCartMessage("This product is out of stock.");
      return;
    }

    addToCart(product);

    setCartMessage(`${product.name} added to cart.`);
  };

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
              <option value="All">All Categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {cartMessage && (
            <p role="status" aria-live="polite">
              {cartMessage}
            </p>
          )}

          {loading && (
            <p role="status">Loading products...</p>
          )}

          {!loading && error && (
            <div role="alert">
              <p>{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <p>
              {products.length === 0
                ? "No products available yet."
                : "No products match your search or category."}
            </p>
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <img
                    src={
                      product.image_url ||
                      `https://picsum.photos/300/200?random=${product.id}`
                    }
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                  />

                  <h3>{product.name}</h3>

                  <p className="category">
                    {product.category || "Uncategorized"}
                  </p>

                  <div className="product-bottom">
                    <span className="price">
                      {formatPrice(product.price)}
                    </span>

                    <span className="stock">
                      Stock: {product.stock_quantity}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="add-cart-btn"
                    disabled={Number(product.stock_quantity) <= 0}
                    onClick={() => handleAddToCart(product)}
                  >
                    {Number(product.stock_quantity) <= 0
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
