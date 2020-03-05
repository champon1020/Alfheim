import { ActionEnum } from "./actions";
import { ArticleType, CategoryType } from "src/type";
import { ManageState } from "src/stores/store";

export const updateDraft = (draft: ManageState) => {
  return {
    type: ActionEnum.UPDATE_DRAFT,
    payload: {
      article: draft.article,
      draftContent: draft.draftContent
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

export const updateResourceArticle = (article: ArticleType) => {
  return {
    type: ActionEnum.UPDATE_RESOURCE_ARTICLE,
    payload: {
      article: article
    }
  };
};
export type UpdateResourceArticleAction = ReturnType<typeof updateResourceArticle>;

export const updateResourceTitle = (title: string) => {
  return {
    type: ActionEnum.UPDATE_RESOURCE_TITLE,
    payload: {
      title: title
    }
  };
};
export type UpdateResourceTitleAction = ReturnType<typeof updateResourceTitle>;

export const updateResourceCategories = (categories: CategoryType[]) => {
  return {
    type: ActionEnum.UPDATE_RESOURCE_CATEGORIES,
    payload: {
      categories: categories
    }
  };
};
export type UpdateResourceCategoriesAction = ReturnType<typeof updateResourceCategories>;

export type ManageActionType = 
  UpdateDraftAction |
  UpdateDraftContentAction | 
  UpdateResourceArticleAction | 
  UpdateResourceTitleAction |
  UpdateResourceCategoriesAction;