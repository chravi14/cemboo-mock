import * as ACTIONS from "./../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case ACTIONS.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
