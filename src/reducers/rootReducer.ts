import sidebarReducer from "./sidebarReducer";
import manageReducer from "./manageReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  sidebarReducer,
  manageReducer
});

export default rootReducer;