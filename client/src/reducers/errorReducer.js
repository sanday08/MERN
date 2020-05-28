import { ERROR_DISPATCH } from "./../actions/types";
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ERROR_DISPATCH:
      return action.payload;

    default:
      return initialState;
  }
};
