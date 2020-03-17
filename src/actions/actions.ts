import { updateArticles } from "./articleAction";
import { updateRecommendArticles } from "./sidebarAction";
import { updateDraftContent, updateResourceArticle, updateDraft } from "./manageAction";

export enum ActionEnum {
  // article action
  UPDATE_ARTICLES = "UPDATE_ARTICLES",
  // sidebar action
  UPDATE_RECOMMEND_ARTICLES = "UPDATE_RECOMMEND_ARTICLES",
  // manage action
  UPDATE_DRAFT = "UPDATE_DRAFT",
  UPDATE_DRAFT_CONTENT = "UPDATE_DRAFT_CONTENT",
  UPDATE_RESOURCE_ARTICLE = "UPDATE_RESOURCE_ARTICLE",
}

class AppActionCreator {
  // article action
  public updateArticles = updateArticles;
  // sidebar action
  public updateRecommendArticles = updateRecommendArticles;
  // manage action
  public updateDraft = updateDraft;
  public updateDraftContent = updateDraftContent;
  public updateResourceArticle = updateResourceArticle;
}

const appActionCreator: AppActionCreator = new AppActionCreator();

export default appActionCreator;