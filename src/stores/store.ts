import { createStore, AnyAction, Store } from "redux";
import { ArticleType, DraftType } from "../type";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
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

export type ManageState = {
  article: DraftType;
  draftContent: string;
}

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
) as Store<any, AnyAction>;

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store);

export default store;