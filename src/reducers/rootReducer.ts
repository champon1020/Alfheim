import articleReducer from "./articleReducer";
import categoryReducer from "./categoryReducer";
import sidebarReducer from "./sidebarReducer";
import manageReducer from "./manageReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  articleReducer,
  categoryReducer,
  sidebarReducer,
  manageReducer
});

export default rootReducer;