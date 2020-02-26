import { Reducer } from "redux";
import { SidebarState } from "../stores/store";
import { UpdateRecommendArticlesAction} from "../actions/sidebarAction";
import { ActionEnum } from "../actions/actions";

export const initSidebarState: SidebarState = {
  recommendArticles: []
};

const sidebarReducer: Reducer<SidebarState, UpdateRecommendArticlesAction> = (
  state = initSidebarState,
  action: UpdateRecommendArticlesAction
): SidebarState => {
  switch(action.type) {
  case ActionEnum.UPDATE_RECOMMEND_ARTICLES: {
    const thisAction: UpdateRecommendArticlesAction = action;
    return {
      recommendArticles: thisAction.payload.recommendArticles
    };
  }
  default:
    return state;
  }
};

export default sidebarReducer;