import { updateArticles } from "./articleAction";
import { updateRecommendArticles } from "./sidebarAction";

export enum ActionEnum {
  UPDATE_ARTICLES = "UPDATE_ARTICLES",
  UPDATE_RECOMMEND_ARTICLES = "UPDATE_RECOMMEND_ARTICLES"
}

class AppActionCreator {
  public updateArticles = updateArticles;
  public updateRecommendArticles = updateRecommendArticles;
}

export const appActionCreator: AppActionCreator = new AppActionCreator();