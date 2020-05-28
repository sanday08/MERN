import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import { combineReducers } from "redux";
import profileReducer from "./profileReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  profile: profileReducer,
});
