const initialState = {
  user: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "sign_In_User": {
      return { ...state, user: action.data };
    }
    case "sign_Out_User": {
      return { ...state, user: null };
    }
    default:
      return initialState;
  }
};
export default authReducer;
