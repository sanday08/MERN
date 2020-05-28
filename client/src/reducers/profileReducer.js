import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
} from "../actions/types";
const InitialState = {
  profile: null,
  profiles: null,
  isLoading: false,
};
export default (state = InitialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        isLoading: false,
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };

    default:
      return state;
  }
};
