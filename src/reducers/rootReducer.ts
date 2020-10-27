import { combineReducers } from "redux";

import manageReducer from "./manageReducer";

const rootReducer = combineReducers({
  manageReducer,
});

export default rootReducer;
