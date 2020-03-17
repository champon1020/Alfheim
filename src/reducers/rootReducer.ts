import articleReducer from "./articleReducer";
import sidebarReducer from "./sidebarReducer";
import manageReducer from "./manageReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  articleReducer,
  sidebarReducer,
  manageReducer
});

export default rootReducer;