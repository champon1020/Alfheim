import { UpdateArticlesAction, ArticleAction, LeftShiftArticleAction, RightShiftArticleAction,  } from "../actions/articleAction";
import { ArticlesState } from "../stores/store";
import { Reducer } from "redux";
import { ActionEnum } from "../actions/actions";

export const initArticlesState: ArticlesState = {
  articles: []
};

const articleReducer: Reducer<ArticlesState, ArticleAction> = (
  state = initArticlesState,
  action: ArticleAction
): ArticlesState => 
{
  switch(action.type) {
  case ActionEnum.UPDATE_ARTICLES: {
    const thisAction = action as UpdateArticlesAction;
    return {
      articles: thisAction.payload.articles
    };
  }
  case ActionEnum.LEFT_SHIFT_ARTICLE: {
    const thisAction = action as LeftShiftArticleAction;
    const { articles } = state;
    articles.push(thisAction.payload.article);
    articles.shift();
    return {
      articles: articles
    };
  }
  case ActionEnum.RIGHT_SHIFT_ARTICLE: {
    const thisAction = action as RightShiftArticleAction;
    const { articles } = state;
    articles.unshift(thisAction.payload.article);
    articles.pop();
    return {
      articles: articles
    };
  }
  default:
    return state;
  }
};

export default articleReducer;