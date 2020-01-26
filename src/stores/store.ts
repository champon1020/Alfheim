import { createStore } from "redux";
import { ArticleType } from "../types/types";
import rootReducer from "../reducers/rootReducer";

export type ArticlesState = {
  articles: ArticleType[];
}

export type SidebarState = {
  recomArticles: Array<{
    id: number;
    title: string;
  }>;
}

export const store = createStore(rootReducer);