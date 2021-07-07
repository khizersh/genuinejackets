import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import favouriteReducer from "./favouriteReducer";
export default combineReducers({
  favouriteReducer,
  authReducer,
  cartReducer,
});
