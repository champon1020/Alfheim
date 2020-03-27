import { updateDraftContent, updateResourceArticle, updateDraft, memoryLastUrl } from "./manageAction";

export enum ActionEnum {
  // manage action
  UPDATE_DRAFT = "UPDATE_DRAFT",
  UPDATE_DRAFT_CONTENT = "UPDATE_DRAFT_CONTENT",
  UPDATE_RESOURCE_ARTICLE = "UPDATE_RESOURCE_ARTICLE",
  MEMORY_LAST_URL = "MEMORY_LAST_URL"
}

class AppActionCreator {
  // manage action
  public updateDraft = updateDraft;
  public updateDraftContent = updateDraftContent;
  public updateResourceArticle = updateResourceArticle;
  public memoryLastUrl = memoryLastUrl;
}

const appActionCreator: AppActionCreator = new AppActionCreator();

export default appActionCreator;