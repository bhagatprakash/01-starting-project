import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  // console.log(action);
  // console.log(state.items);
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const upDatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const upDatedItems = {
        ...state.items[existingCartItemIndex],
        quantity: state.items[existingCartItemIndex].quantity + 1,
      };
      upDatedItems[existingCartItemIndex] = upDatedItems;
    } else {
      upDatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: upDatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItem, 1);
    } else {
      const updatedItems = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItems;
    }
    return { ...state, items: updatedItems };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
export default CartContext;