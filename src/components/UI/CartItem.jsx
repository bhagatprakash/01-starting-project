import { currencyFormatter } from "../../Utils/Formatting";
export default function CartItem({
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
}) {
  return (
    <li className="cart-item">
      <p>
        {name}-{quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onIncrease}>-</button>
        <spn>{quantity}</spn>
        <button onClick={onDecrease}>+</button>
      </p>
    </li>
  );
}