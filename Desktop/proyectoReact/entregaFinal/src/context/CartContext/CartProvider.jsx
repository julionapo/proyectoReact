import { useContext, useState } from "react";
import { CartContext } from "./CartContext.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agrega cantidad exacta (por defecto 1)
  const addItem = (item, qty = 1) => {
    const existing = cart.find((prod) => prod.title === item.title);
    const amount = Number(qty) || 1;

    if (existing) {
      setCart(
        cart.map((prod) =>
          prod.title === item.title
            ? { ...prod, quantity: prod.quantity + amount }
            : prod
        )
      );
      toast.info(`Cantidad actualizada: ${item.name}`);
    } else {
      setCart([...cart, { ...item, quantity: amount }]);
      toast.success(`Producto agregado: ${item.name}`);
    }
  };

  // Suma 1 al producto
  const incrementItem = (id) => {
    setCart(
      cart.map((prod) =>
        prod.title === id ? { ...prod, quantity: prod.quantity + 1 } : prod
      )
    );
  };

  // Resta 1 al producto (si llega a 0, lo elimina)
  const decrementItem = (id) => {
    setCart(
      cart
        .map((prod) =>
          prod.title === id ? { ...prod, quantity: prod.quantity - 1 } : prod
        )
        .filter((prod) => prod.quantity > 0)
    );
  };

  // Actualiza cantidad exacta
  const updateItem = (id, quantity) => {
    const amount = Math.max(0, Number(quantity) || 0);
    setCart(
      cart
        .map((prod) =>
          prod.title === id ? { ...prod, quantity: amount } : prod
        )
        .filter((prod) => prod.quantity > 0)
    );
    toast.info("Cantidad modificada en el carrito");
  };

  const removeItem = (id) => {
    setCart(cart.filter((prod) => prod.title !== id));
    toast.error("Producto eliminado del carrito");
  };

  const clearCart = () => {
    setCart([]);
    toast.warn("Carrito vaciado");
  };

  const total = () =>
    cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);

  const getTotalItems = () =>
    cart.reduce((acc, prod) => acc + prod.quantity, 0);

  const isInCart = (id) => cart.some((prod) => prod.title === id);

  // ✅ checkout corregido
  const checkout = () => {
    if (cart.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }

    const resumen = cart
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} = $${item.price * item.quantity}`
      )
      .join("\n");

    const totalFinal = total();

    alert(
      `🛒 ¡Compra realizada con éxito!\n\nResumen de tu compra:\n\n${resumen}\n\nTotal: $${totalFinal}\n\nGracias por tu compra Julio 🎉`
    );

    toast.success("¡Compra realizada con éxito!");
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        incrementItem,
        decrementItem,
        updateItem,
        removeItem,
        clearCart,
        total,
        checkout,
        getTotalItems,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
