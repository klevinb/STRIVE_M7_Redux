export default function (state = {}, action) {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          products: state.cart.products.concat(action.payload),
        },
      };
    case "REMOVE_ITEM_FROM_CART":
      const bookToRemove = state.cart.products.findIndex(
        (bookId) => bookId === action.payload
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          products: [
            ...state.cart.products.slice(0, bookToRemove),
            ...state.cart.products.slice(bookToRemove + 1),
          ],
        },
      };

    case "SET_USER_NAME":
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
      };
    default:
      return state;
  }
}
