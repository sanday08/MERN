import axios from "./node_modules/axios";
import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  ERROR_DISPATCH,
} from "./types";

//get current user Profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(profileLoading());

  axios
    .get("/api/profile/")
    .then((res) => {
      return dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_PROFILE, payload: {} }));
};

//create Profile

export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile/", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({ type: ERROR_DISPATCH, payload: err.response.data })
    );
};

//loading profile
export const profileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// clear current user profile

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
