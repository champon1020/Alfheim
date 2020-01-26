import {
  ArticlesState, SidebarState 
} from "../stores/store";

import articlesReducer from "./articlesReducer";
import sidebarReducer from "./sidebarReducer";
import { combineReducers } from "redux";

export const initArticlesState: ArticlesState = {
  articles: []
};

export const initSidebarState: SidebarState = {
  recomArticles: []
};

const rootReducer = combineReducers({
  articlesReducer,
  sidebarReducer
});

export default rootReducer;