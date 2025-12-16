import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext/useCartContext";

import "./Nav.css";

export const Nav = () => {
  const { getTotalItems } = useCartContext();

  return (
    <nav className="nav-bar">
      <Link to="/" className="nav-link" aria-label="Ir al inicio">Home</Link>
      {/* ✅ Usamos categorías normalizadas en la URL */}
      <Link to="/category/electrodomesticos" className="nav-link" aria-label="Ver electrodomésticos">
        Electrodomésticos
      </Link>
      <Link to="/category/celulares" className="nav-link" aria-label="Ver celulares">
        Celulares
      </Link>
      <Link to="/carrito" className="nav-link carrito-link">
  🛒 Carrito ({getTotalItems()})
</Link>

    </nav>
  );
};
