import { 
  UpdateArticlesActionType, 
  UpdateArticlesAction 
} from "../actions/articleAction";

import { 
  initArticlesState 
} from "./rootReducer";

import { 
  ArticlesState 
} from "../stores/store";

import { Reducer } from "redux";
import { ActionEnum } from "../actions/actions";

const articlesReducer: Reducer<ArticlesState, UpdateArticlesActionType> = (
  state = initArticlesState,
  action: UpdateArticlesActionType
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

export default articlesReducer;