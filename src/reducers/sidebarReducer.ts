import { Reducer } from "redux";
import { SidebarState } from "../stores/store";
import { UpdateRecommendArticlesAction, UpdateRecommendArticlesActionType } from "../actions/sidebarAction";
import { initSidebarState } from "./rootReducer";
import { ActionEnum } from "../actions/actions";

const sidebarReducder: Reducer<SidebarState, UpdateRecommendArticlesAction> = (
  state = initSidebarState,
  action: UpdateRecommendArticlesActionType
): SidebarState => {
  switch(action.type) {
  case ActionEnum.UPDATE_RECOMMEND_ARTICLES: {
    const thisAction: UpdateRecommendArticlesAction = action;
    return {
      recomArticles: thisAction.payload.recomArticles
    };
  }
  default:
    return state;
  }
};

export default sidebarReducder;