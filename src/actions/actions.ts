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

const appActionCreator: AppActionCreator = new AppActionCreator();

export default appActionCreator;