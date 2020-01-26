import { ActionEnum } from "./actions";
import { Action } from "redux";
import { ArticleType } from "../types/types";

export interface UpdateArticlesAction extends Action 
{
  type: ActionEnum.UPDATE_ARTICLES;
  payload: {
    articles: ArticleType[];
  };
}

export type UpdateArticlesActionType = UpdateArticlesAction;

export const updateArticles = (articles: ArticleType[]): UpdateArticlesAction => 
{
  return {
    type: ActionEnum.UPDATE_ARTICLES,
    payload: {
      articles: articles
    }
  };
};