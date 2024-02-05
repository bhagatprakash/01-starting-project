import { useContext } from "react";
import Modal from "./Modal.jsx";
import CartContext from "../Store/CartContext.jsx";
import Button from "./Button.jsx";
import { currencyFormatter } from "../../Utils/Formatting.js";
import UserProgressContext from "../Store/UserProgressContect.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const UserProgressCtx = useContext(UserProgressContext);

  const cartTotel = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    UserProgressCtx.hideCart();
  }
  return (
    <Modal className="Cart" open={UserProgressCtx.process === "cart"}>
      <h2>Your cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>

      <p className="cart-total">{currencyFormatter.format(cartTotel)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button onClick={handleCloseCart}> Go to Checkout </Button>
      </p>
    </Modal>
  );
}
