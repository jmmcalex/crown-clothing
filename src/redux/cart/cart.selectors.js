import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

// Using createSelector is how we memoize our state. It will do the caching of the state for us
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumlatedQuantity, cartItem) => accumlatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumlatedQuantity, cartItem) =>
      accumlatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
