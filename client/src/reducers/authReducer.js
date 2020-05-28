import { AUTH_DISPATCH } from "../actions/types";
import isEmpty from "../validation/is-empty";
const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_DISPATCH:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    default:
      return state;
  }
}
