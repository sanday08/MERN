import { ERROR_DISPATCH, AUTH_DISPATCH } from "./types";
import Axios from "./node_modules/axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerData = (userData, history) => (dispatch) => {
  Axios.post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) => {
      dispatch({ type: ERROR_DISPATCH, payload: err.response.data });
    });
};

export const userLogin = (user) => (dispatch) => {
  Axios.post("/api/users/login", user)
    .then((res) => {
      //respose data from server
      const { token } = res.data;
      //save data in localstorage
      localStorage.setItem("jwtToken", token);
      //set Authorze to every request
      setAuthToken(token);
      //Decode token
      const decode = jwt_decode(token);

      return dispatch(setCurrentUser(decode));
    })
    .catch((err) => {
      if (err.response)
        dispatch({ type: ERROR_DISPATCH, payload: err.response.data });
      else dispatch({ type: ERROR_DISPATCH, payload: err.message });
    });
};
export const setCurrentUser = (decode) => {
  if (decode) return { type: AUTH_DISPATCH, payload: decode };
  return { type: AUTH_DISPATCH, payload: {} };
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

// export const clearError = () => {
//   return { type: ERROR_DISPATCH, payload: {} };
// };
