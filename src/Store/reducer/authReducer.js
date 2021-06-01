const initialState = {
  user: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_AUTH": {
      return { ...state, user: action.data };
    }
  }
};
export default authReducer;
