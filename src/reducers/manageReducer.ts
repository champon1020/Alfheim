import { Reducer } from "react";
import { 
  UpdateDraftContentAction, 
  UpdateResourceArticleAction, 
  ManageActionType, 
  UpdateDraftAction, 
  MemoryLastUrlAction 
} from "src/actions/manageAction";
import { ManageState } from "src/stores/store";
import { ActionEnum } from "src/actions/actions";

const initManageState: ManageState = {
  article: {
    id: "",
    sortedId: -1,
    title: "",
    categories: "",
    updateDate: "",
    contentHash: "",
    imageHash: "",
  },
  draftContent: "",
  url: ""
};

const manageReducer: Reducer<ManageState, ManageActionType> = (
  state = initManageState,
  action: ManageActionType
): ManageState => {
  switch(action.type) {
  case ActionEnum.UPDATE_DRAFT: {
    const thisAction = action as UpdateDraftAction;
    return {
      ...state,
      article: thisAction.payload.article,
      draftContent: thisAction.payload.draftContent
    };
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
  case ActionEnum.MEMORY_LAST_URL: {
    const thisAction = action as MemoryLastUrlAction;
    return {
      ...state,
      url: thisAction.payload.url
    };
  }
  default:
    return state;
  }
};

export default manageReducer;