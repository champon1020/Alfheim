import { ActionEnum } from "./actions";
import { DraftType } from "src/type";

export const updateDraft = (draft: DraftType, contents: string) => {
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

export const updateResourceArticle = (article: DraftType) => {
  return {
    type: ActionEnum.UPDATE_RESOURCE_ARTICLE,
    payload: {
      article: article
    }
  };
};
export type UpdateResourceArticleAction = ReturnType<typeof updateResourceArticle>;

export const memoryLastUrl = (url: string) => {
  return {
    type: ActionEnum.MEMORY_LAST_URL,
    payload: {
      url: url
    }
  };
};
export type MemoryLastUrlAction = ReturnType<typeof memoryLastUrl>;

export type ManageActionType = 
  UpdateDraftAction |
  UpdateDraftContentAction | 
  UpdateResourceArticleAction |
  MemoryLastUrlAction;