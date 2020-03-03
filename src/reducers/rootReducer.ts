import articleReducer from "./articleReducer";
import categoryReducer from "./categoryReducer";
import sidebarReducer from "./sidebarReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  articleReducer,
  categoryReducer,
  sidebarReducer
});

export default rootReducer;