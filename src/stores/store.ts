import { createStore } from "redux";
import { ArticleType } from "../api/myapi";
import rootReducer from "../reducers/rootReducer";

export type ArticlesState = {
  articles: ArticleType[];
}

export type SidebarState = {
  recommendArticles: Array<{
    id: number;
    title: string;
  }>;
}

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>