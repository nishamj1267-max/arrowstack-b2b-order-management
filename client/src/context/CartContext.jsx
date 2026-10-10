import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "b2b-shopping-cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart]);

  const addToCart = (product) => {
    console.log("ADD TO CART CLICKED:", product);

    if (!product || product.id == null) {
      console.error("Invalid product:", product);
      return;
    }

    const stock = Number(product.stock_quantity);
    const price = Number(product.price);

    if (!Number.isFinite(stock) || stock <= 0) {
      console.warn("Product is out of stock:", product.name);
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      console.error("Invalid product price:", product.price);
      return;
    }

    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existing) {
        if (Number(existing.qty) >= stock) {
          console.warn("Maximum available stock reached.");
          return currentCart;
        }

        return currentCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, qty: Number(item.qty) + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          id: product.id,
          name: product.name,
          category: product.category || "Uncategorized",
          price,
          qty: 1,
          stock_quantity: stock,
          image:
            product.image_url ||
            `https://picsum.photos/120?random=${product.id}`,
        },
      ];
    });
  };

  const increaseQty = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        String(item.id) === String(id) &&
        Number(item.qty) < Number(item.stock_quantity)
          ? { ...item, qty: Number(item.qty) + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        String(item.id) === String(id) && Number(item.qty) > 1
          ? { ...item, qty: Number(item.qty) - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemCount = cart.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.qty || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
