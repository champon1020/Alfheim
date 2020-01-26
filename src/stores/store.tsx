import { createStore } from "redux";
import Article from "../components/article/Article";
import rootReducer from "../reducers/rootReducer";

export type ArticlesState = {
  articles: Article[];
}

export const store = createStore(rootReducer);