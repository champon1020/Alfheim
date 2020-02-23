import { ArticleType } from "../api/myapi";
import { updateArticles, UpdateArticlesAction } from "./articleAction";
import { UpdateRecommendArticlesAction, updateRecommendArticles } from "./sidebarAction";

export enum ActionEnum {
  UPDATE_ARTICLES = "UPDATE_ARTICLES",
  
  UPDATE_RECOMMEND_ARTICLES = "UPDATE_RECOMMEND_ARTICLES"
}

export interface ActionCreator {
  updateArticles(articles: ArticleType[]): UpdateArticlesAction;
  updateRecommendArticles(recomArticles: Array<{id: number; title: string}>): UpdateRecommendArticlesAction;
}

class AppActionCreator implements ActionCreator {
  public updateArticles = updateArticles;
  public updateRecommendArticles = updateRecommendArticles;
}

export const appActionCreator: AppActionCreator = new AppActionCreator();