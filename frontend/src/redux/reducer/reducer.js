const INIT_STATE = {
  carts: [],
};

export const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      const itemIndex = state.carts.findIndex(
        (item) =>
          item.id === action.payload.id && item.option === action.payload.option
      );
      if (itemIndex >= 0) {
        const updatedCarts = [...state.carts];
        console.log(updatedCarts);
        updatedCarts[itemIndex].quantity += 1;
        return { ...state, carts: updatedCarts };
      }
      return {
        ...state,
        carts: [...state.carts, action.payload], // item will be added previous + new item
      };
    case "REMOVE_ITEM": {
      const updatedCarts = state.carts.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.option === action.payload.option
          )
      );
      return { ...state, carts: updatedCarts };
    }

    case "EMPTY_CART":
      return {
        ...state,
        carts: [],
      };
    default:
      return state;
  }
};
