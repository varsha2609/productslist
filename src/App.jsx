import React, { useState } from "react";
import products from "./products";
import "./App.css";

function App() {
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);

  const handleIncrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 0;
    if (qty === 0) return;

    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: qty }];
      }
    });

    // Reset quantity selector
    setQuantities((prev) => ({
      ...prev,
      [product.id]: 0,
    }));
  };

  return (
    <div className="app">
      <h1>🛒 Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>₹{product.price}</p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(product.id)}>-</button>
              <span>{quantities[product.id] || 0}</span>
              <button onClick={() => handleIncrement(product.id)}>+</button>
            </div>
            <button
              className="add-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>🛍️ Cart Summary</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} × {item.quantity} = ₹{item.price * item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
