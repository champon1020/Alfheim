import { Reducer } from "react";
import { UpdateDraftContentAction, UpdateResourceArticleAction, ManageActionType, UpdateResourceTitleAction, UpdateResourceCategoriesAction, UpdateDraftAction } from "src/actions/manageAction";
import { ManageState } from "src/stores/store";
import { ActionEnum } from "src/actions/actions";

const initManageState: ManageState = {
  article: {
    id: -1,
    title: "",
    categories: [],
    createDate: new Date(),
    updateDate: new Date(),
    contentUrl: "",
    imageUrl: "",
    private: false
  },
  draftContent: ""
};

const manageReducer: Reducer<ManageState, ManageActionType> = (
  state = initManageState,
  action: ManageActionType
): ManageState => {
  switch(action.type) {
  case ActionEnum.UPDATE_DRAFT: {
    const thisAction = action as UpdateDraftAction;
    return thisAction.payload;
  }
  case ActionEnum.UPDATE_DRAFT_CONTENT: {
    const thisAction = action as UpdateDraftContentAction;
    return {
      ...state,
      draftContent: thisAction.payload.content
    };
  }
  case ActionEnum.UPDATE_RESOURCE_ARTICLE: {
    const thisAction = action as UpdateResourceArticleAction;
    return {
      ...state,
      article: thisAction.payload.article
    };
  }
  case ActionEnum.UPDATE_RESOURCE_TITLE: {
    const thisAction = action as UpdateResourceTitleAction;
    return {
      ...state,
      article: {
        ...state.article,
        title: thisAction.payload.title
      }
    };
  }
  case ActionEnum.UPDATE_RESOURCE_CATEGORIES: {
    const thisAction = action as UpdateResourceCategoriesAction;
    return {
      ...state,
      article: {
        ...state.article,
        categories: thisAction.payload.categories
      }
    };
  }
  default:
    return state;
  }
};

export default manageReducer;