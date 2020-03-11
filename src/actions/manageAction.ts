import { ActionEnum } from "./actions";
import { Draft } from "src/type";

export const updateDraft = (draft: Draft, contents: string) => {
  return {
    type: ActionEnum.UPDATE_DRAFT,
    payload: {
      article: draft,
      draftContent: contents
    }
  };
};
export type UpdateDraftAction = ReturnType<typeof updateDraft>;

export const updateDraftContent = (content: string) => {
  return {
    type: ActionEnum.UPDATE_DRAFT_CONTENT,
    payload: {
      content: content
    }
  };
};
export type UpdateDraftContentAction = ReturnType<typeof updateDraftContent>;

export const updateResourceArticle = (article: Draft) => {
  return {
    type: ActionEnum.UPDATE_RESOURCE_ARTICLE,
    payload: {
      article: article
    }
  };
};
export type UpdateResourceArticleAction = ReturnType<typeof updateResourceArticle>;

export type ManageActionType = 
  UpdateDraftAction |
  UpdateDraftContentAction | 
  UpdateResourceArticleAction;