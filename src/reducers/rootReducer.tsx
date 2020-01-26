import {
  ArticlesState 
} from "../stores/store";

import articlesReducer from "./articlesReducer";
import { combineReducers } from "redux";

export const initArticlesState: ArticlesState = {
  articles: []
};

const rootReducer = combineReducers({
  articlesReducer
});

export default rootReducer;