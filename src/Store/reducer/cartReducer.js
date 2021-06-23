const initialState = {
  cartArray: [],
  coupon: null,
  checkoutId: null,
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add_TO_CART": {
      if (state.cartArray.find((x) => x.id === action.data.id)) {
        return state;
      }
      return { ...state, cartArray: [...state.cartArray, action.data] };
    }
    case "REMOVE_FROM_CART": {
      let filtered = state.cartArray.filter((x) => {
        return x.id !== action.data;
      });
      console.log(filtered);
      return { ...state, cartArray: filtered };
    }
    case "UPDATE_CART": {
      let data = { ...state };
      let updated = data?.cartArray.map((x) => {
        if (x.id === action.data.id) {
          x.quantity = action.data.quantityValue;
        }
        return x;
      });
      // console.log(updated);
      return { ...state, cartArray: updated };
    }
    case "CONFIRM_CHECKOUT": {
      return { ...state };
    }
    case "COUPON": {
      return { ...state, coupon: action.data };
    }
    case "EMPTY_CART": {
      return { cartArray: [], coupon: null, checkoutId: null };
    }
    default:
      return state;
  }
};
export default cartReducer;
