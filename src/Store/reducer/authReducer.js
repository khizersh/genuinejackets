const initialState = {
  user: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "sign_In_User": {
      return { ...state, user: action.data };
    }
    default:
      return initialState;
  }
};
export default authReducer;
