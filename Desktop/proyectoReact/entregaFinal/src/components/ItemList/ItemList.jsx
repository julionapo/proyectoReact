import React from "react";
import { Link } from "react-router-dom";
import "./ItemList.css";

const ItemList = ({ products }) => {
  if (products.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="item-list">
      {products.map((product) => (
        <div key={product.id} className="item-card">
          <h3>{product.title}</h3>

          <img
            src={product.image}
            alt={product.title}
            className="item-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://dummyimage.com/300x300/cccccc/000000&text=Imagen+no+disponible";
            }}
          />

          <p className="price">
            ${product.price.toLocaleString("es-AR")}
          </p>

          <Link to={`/detalle/${product.id}`} className="btn-detalle">
            Detalle
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
