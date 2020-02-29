import { createStore } from "redux";
import { ArticleType } from "../type";
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

export const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export type RootState = ReturnType<typeof store.getState>