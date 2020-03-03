import { updateArticles } from "./articleAction";
import { updateRecommendArticles } from "./sidebarAction";
import { updateCategories } from "./categoryAction";

export enum ActionEnum {
  UPDATE_ARTICLES = "UPDATE_ARTICLES",
  UPDATE_CATEGORIES = "UPDATE_CATEGORIES",
  UPDATE_RECOMMEND_ARTICLES = "UPDATE_RECOMMEND_ARTICLES"
}

class AppActionCreator {
  public updateArticles = updateArticles;
  public updateCategories = updateCategories;
  public updateRecommendArticles = updateRecommendArticles;
}

const appActionCreator: AppActionCreator = new AppActionCreator();

export default appActionCreator;