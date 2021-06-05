import * as ACTIONS from "./../actions/types";

const initialState = {
  errors: null,
};
const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_ERRORS:
      console.log(action, "in reducer");
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
