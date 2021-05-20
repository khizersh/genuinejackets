const initialState = {
  cartArray: [],
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add_TO_CART": {
      if (state.cartArray.find((x) => x.id === action.data.id)) {
        return state;
      }
      console.log("Cart added");
      return { ...state, cartArray: [...state.cartArray, action.data] };
    }
    case "REMOVE_FROM_CART": {
      console.log("Cart Removed", action.data);
      let filtered = state.cartArray.filter((x) => {
        return x.id !== action.data;
      });
      console.log(filtered);
      return { ...state, cartArray: filtered };
    }
    case "UPDATE_CART": {
      let data = { ...state };
      console.log(action.data.id);
      console.log(action);
      let updated = data?.cartArray.map((x) => {
        console.log(action.data.quantityValue);
        if (x.id === action.data.id) {
          x.quantity =  action.data.quantityValue;
        }
        return x
      });
      console.log(updated);
      return { ...state, cartArray: updated };
    }
    default:
      return state;
  }
};
export default cartReducer;
