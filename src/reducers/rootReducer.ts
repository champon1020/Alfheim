import articlesReducer from "./articlesReducer";
import sidebarReducer from "./sidebarReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  articlesReducer,
  sidebarReducer
});

export default rootReducer;