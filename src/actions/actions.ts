import { updateDraft } from "./manageAction";

export enum ActionEnum {
  // manage action
  UPDATE_DRAFT = "UPDATE_DRAFT",
}

class AppActionCreator {
  // manage action
  public updateDraft = updateDraft;
}

const appActionCreator: AppActionCreator = new AppActionCreator();

export default appActionCreator;