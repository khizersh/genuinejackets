const initialState = {
  currency_Value: "USD",
};
const currenyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_CURRENCY_TYPE": {
      console.log("fav Added");

      return { ...state, currency_Value:action.data };
    }

    default:
      return state;
  }
};
export default currenyReducer;
