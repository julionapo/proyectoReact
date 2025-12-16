import React, { useState } from "react";
import { useCartContext } from "../../context/CartContext/CartProvider";
import { useNavigate } from "react-router-dom";
import "./ItemDetail.css";

const ItemDetail = ({ product }) => {
  const { addItem, incrementItem, decrementItem, isInCart, cart } = useCartContext();
  const { title, price, image, category } = product;
  const cartItem = cart.find((prod) => prod.title === product.title);
  const currentQty = cartItem?.quantity ?? 0;

  const [localQty, setLocalQty] = useState(0);
  const navigate = useNavigate();

  const increase = () => {
    if (isInCart(product.title)) {
      incrementItem(product.title);
    } else {
      setLocalQty((prev) => prev + 1);
    }
  };

  const decrease = () => {
    if (isInCart(product.title)) {
      decrementItem(product.title);
    } else {
      setLocalQty((prev) => Math.max(0, prev - 1));
    }
  };

  const handleButtonClick = () => {
    if (localQty > 0 && !isInCart(product.title)) {
      addItem(product, localQty);
    } else if (isInCart(product.title)) {
      navigate("/carrito");
    }
  };

  return (
    <div className="item-detail">
      <img
        src={image}
        alt={title}
        className="detail-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/300x300?text=Imagen+no+disponible";
        }}
      />

      <h2 className="detail-name">{title}</h2>
      <p className="detail-price">${price}</p>
      <p className="detail-description">Categoría: {category}</p>

      <div className="quantity-selector">
        <button onClick={decrease} className="qty-btn">–</button>
        <span className="quantity-number">
          {isInCart(product.title) ? currentQty : localQty}
        </span>
        <button onClick={increase} className="qty-btn">+</button>
      </div>

      <button
        onClick={handleButtonClick}
        disabled={localQty === 0 && !isInCart(product.title)}
        className={`add-to-cart-btn ${isInCart(product.title) ? "ver-compra" : ""}`}
      >
        {isInCart(product.title) ? "Ver compra" : "Agregar al carrito"}
      </button>
    </div>
  );
};

export default ItemDetail;
