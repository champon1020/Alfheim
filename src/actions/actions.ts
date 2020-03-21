import { updateDraftContent, updateResourceArticle, updateDraft } from "./manageAction";

export enum ActionEnum {
  // manage action
  UPDATE_DRAFT = "UPDATE_DRAFT",
  UPDATE_DRAFT_CONTENT = "UPDATE_DRAFT_CONTENT",
  UPDATE_RESOURCE_ARTICLE = "UPDATE_RESOURCE_ARTICLE",
}

class AppActionCreator {
  // manage action
  public updateDraft = updateDraft;
  public updateDraftContent = updateDraftContent;
  public updateResourceArticle = updateResourceArticle;
}

const appActionCreator: AppActionCreator = new AppActionCreator();

export default appActionCreator;