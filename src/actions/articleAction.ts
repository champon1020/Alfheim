import { ActionEnum } from "./actions";
import { ArticleType } from "../type";


export type UpdateArticlesAction = ReturnType<typeof updateArticles>

export const updateArticles = (articles: ArticleType[]) => {
  return {
    type: ActionEnum.UPDATE_ARTICLES,
    payload: {
      articles: articles
    }
  };
};

export type LeftShiftArticleAction = ReturnType<typeof leftShiftArticle>

export const leftShiftArticle = (article: ArticleType) => {
  return {
    type: ActionEnum.LEFT_SHIFT_ARTICLE,
    payload: {
      article: article,
    }
  };
};

export type RightShiftArticleAction = ReturnType<typeof rightShiftArticle>

export const rightShiftArticle = (article: ArticleType) => {
  return {
    type: ActionEnum.RIGHT_SHIFT_ARTICLE,
    payload: {
      article: article,
    }
  };
};

export type ArticleAction = 
    UpdateArticlesAction 
  | LeftShiftArticleAction 
  | RightShiftArticleAction;