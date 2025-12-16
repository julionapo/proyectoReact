import "./Count.css";

export const Count = ({ detail, quantity, setQuantity, updateItem, isInCart }) => {
  const increment = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);

    if (isInCart(detail.id)) {
      updateItem(detail.id, newQty);
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);

      if (isInCart(detail.id)) {
        updateItem(detail.id, newQty);
      }
    }
  };

  return (
    <div className="count-container">
      <button onClick={decrement}>–</button>
      <span>{quantity}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};
