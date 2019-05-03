import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import notificationReducer from "./notificationReducer";
import { combineReducers } from "redux";

let rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  notification: notificationReducer
});

export default rootReducer;