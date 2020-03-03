import { UpdateArticlesAction } from "../actions/articleAction";
import { ArticlesState } from "../stores/store";
import { Reducer } from "redux";
import { ActionEnum } from "../actions/actions";

export const initArticlesState: ArticlesState = {
  articles: []
};

const articleReducer: Reducer<ArticlesState, UpdateArticlesAction> = (
  state = initArticlesState,
  action: UpdateArticlesAction
): ArticlesState => 
{
  switch(action.type) {
  case ActionEnum.UPDATE_ARTICLES: {
    const updateArticlesAction: UpdateArticlesAction = action;
    return {
      articles: updateArticlesAction.payload.articles
    };
  }
  default:
    return state;
  }
};

export default articleReducer;