import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

const rooReducer = combineReducers({
  user: userReducer,
});

export default rooReducer;
