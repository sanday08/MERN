import axios from "axios";
import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  ERROR_DISPATCH,
  AUTH_DISPATCH,
  GET_PROFILES,
} from "./types";

//get current user Profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(profileLoading());

  axios
    .get("/api/profile")
    .then((res) => {
      return dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_PROFILE, payload: {} }));
};

//get all profiles

export const getAllProfiles = () => (dispatch) => {
  dispatch(profileLoading());

  axios
    .get("/api/profile/all")
    .then((res) => {
      console.log(res.data);
      return dispatch({ type: GET_PROFILES, payload: res.data });
    })
    .catch((err) => dispatch({ type: GET_PROFILES, payload: {} }));
};

//create Profile

export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({ type: ERROR_DISPATCH, payload: err.response.data })
    );
};

//delete Current Profile
export const deleteCurrentProfile = () => (dispatch) => {
  if (window.confirm("Are you sure you want to delete this account?")) {
    axios.delete("/api/profile").then((res) => {
      dispatch({ type: AUTH_DISPATCH, payload: {} });
    });
  }
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

//Add Experince

export const addExperince = (experinceData, history) => (dispatch) => {
  axios
    .post("/api/profile/experience", experinceData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({ type: ERROR_DISPATCH, payload: err.response.data })
    );
};
// error clear
export const clearError = () => {
  return { type: ERROR_DISPATCH, payload: {} };
};
//add Educations
export const addEducation = (educationData, history) => (dispatch) => {
  axios
    .post("/api/profile/education", educationData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({ type: ERROR_DISPATCH, payload: err.response.data })
    );
};
//Delete Educations
export const deleteEdu = (id) => (dispatch) => {
  if (window.confirm("Are you sure?")) {
    axios
      .delete(`/api/profile/education/${id}`)
      .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
      .catch((err) => console.log(err.message));
  }
};

//Delete Experience
export const deleteExp = (id) => (dispatch) => {
  if (window.confirm("Are you sure?")) {
    axios
      .delete(`/api/profile/experience/${id}`)
      .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
      .catch((err) => console.log(err.message));
  }
};

//Get profile via handle

export const getProfile = (handle) => (dispatch) => {
  console.log(handle);
  profileLoading();
  axios
    .get(`/api/profile/handle/${handle}`)
    .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch((err) =>
      dispatch({ type: ERROR_DISPATCH, payload: err.response.data })
    );
};
