import { Reducer } from "react";
import { ActionEnum } from "src/actions/actions";
import { ManageActionType } from "src/actions/manageAction";
import { ManageState } from "src/stores/store";

const initManageState: ManageState = {
  article: {
    id: "",
    sortedId: -1,
    title: "",
    categories: "",
    updateDate: "",
    content: "",
    imageHash: "",
  },
  draftContent: "",
};

const manageReducer: Reducer<ManageState, ManageActionType> = (
  state = initManageState,
  action: ManageActionType
): ManageState => {
  switch (action.type) {
    case ActionEnum.UPDATE_DRAFT: {
      const thisAction = action;
      return {
        ...state,
        article: thisAction.payload.article,
        draftContent: thisAction.payload.draftContent,
      };
    }
    default:
      return state;
  }
};

export default manageReducer;
