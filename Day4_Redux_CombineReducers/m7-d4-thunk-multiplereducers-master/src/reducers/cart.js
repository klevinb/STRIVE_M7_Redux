export default function (state = {}, action) {
  switch (action.type) {
    case "ADD_ITEM_TO_CART":
      return {
        ...state,
        products: state.products.concat(action.payload)
      };
    case "REMOVE_ITEM_FROM_CART":
      const bookToRemove = state.products.findIndex(
        bookId => bookId === action.payload
      );
      return {
        ...state,
        products: [
          ...state.products.slice(0, bookToRemove),
          ...state.products.slice(bookToRemove + 1)
        ]
      };
    default:
      return state;
  }
}
