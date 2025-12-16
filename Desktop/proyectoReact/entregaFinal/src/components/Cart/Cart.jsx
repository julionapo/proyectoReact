import { useCartContext } from "../../context/CartContext/CartProvider";
import "./Cart.css";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cart, total, checkout, clearCart } = useCartContext();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Carrito</h2>
        <p className="empty-cart">Tu carrito está vacío</p>
        <div className="cart-actions">
          <Link to="/" className="back-home-btn">
            ⬅️ Seguir comprando
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Carrito</h2>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <p className="item-name">
            {item.name} x {item.quantity}
          </p>
          <p className="item-subtotal">
            Subtotal: ${item.price * item.quantity}
          </p>
        </div>
      ))}

      <h3 className="cart-total">Total: ${total()}</h3>

      <div className="cart-actions">
        <button className="checkout-btn" onClick={checkout}>
          🛒 Finalizar compra
        </button>
        <button className="clear-btn" onClick={clearCart}>
          ❌ Vaciar carrito
        </button>
        <Link to="/" className="back-home-btn">
          ⬅️ Seguir comprando
        </Link>
      </div>

      <footer className="cart-footer">Página creada por Julio Acuña</footer>
    </div>
  );
};
