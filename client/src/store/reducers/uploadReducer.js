import { SET_UPLOADS_DATA, SET_LOADER } from "./../actions/types";

const initialState = {
  uploads: [],
  showLoader: false,
};

const uploadReducer = (state = initialState, action) => {
  console.log(action.payload, "In Reducer");
  switch (action.type) {
    case SET_UPLOADS_DATA:
      return {
        ...state,
        uploads: action.payload,
      };
    case SET_LOADER:
      return {
        ...state,
        showLoader: action.payload,
      };
    default:
      return state;
  }
};

export default uploadReducer;
