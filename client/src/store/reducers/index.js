import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import uploadReducer from "./uploadReducer";

const rootReducer = combineReducers({
  authReducer,
  errorReducer,
  uploadReducer,
});

export default rootReducer;
