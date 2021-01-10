export const initialState = {
  basket: [],
  user: null,
};

//selector to calculate price total
export const getBasketTotal = (basket) =>
  basket?.reduce(
    (accumulator, currentItem) => accumulator + currentItem.price,
    0
  );

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      let newBasket = [...state.basket];

      index >= 0
        ? newBasket.splice(index, 1)
        : console.warn(
            `Cannot remove product (id: ${action.id}). It is not in the basket!`
          );

      return {
        ...state,
        basket: newBasket,
      };

    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: [],
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
