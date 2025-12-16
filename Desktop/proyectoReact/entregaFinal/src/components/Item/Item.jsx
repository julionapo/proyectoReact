import React from "react";
import { Link } from "react-router-dom";

const Item = ({ product }) => {
  const { id, title, price, image } = product;

  return (
    <div className="card" style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: 8 }}>
      <img
          src={image}
          alt={title}
          style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 6 }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/300x300?text=Imagen+no+disponible";
          }}
      />

      <h3>{title}</h3>
      <p style={{ color: "green", fontWeight: "bold" }}>${price}</p>
      <Link to={`/detalle/${id}`} className="btn" style={{ background: "#1976d2", color: "#fff", padding: "0.5rem 1rem", borderRadius: 4, textDecoration: "none" }}>
        Detalle
      </Link>
    </div>
  );
};

export default Item;
