import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";

const rooReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

export default rooReducer;
