import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import { combineReducers } from "redux";

let rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer
});

export default rootReducer;