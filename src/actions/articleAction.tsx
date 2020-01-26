import {ActionEnum} from "./actions";
import { Action } from "redux";
import { Article } from "../types/types";

export interface UpdateArticlesAction extends Action 
{
  type: ActionEnum.UPDATE_ARTICLES;
  payload: {
    articles: Article[];
  };
}

export type UpdateArticlesActionType = UpdateArticlesAction;

export const updateArticles = (articles: Article[]): UpdateArticlesAction => 
{
  return {
    type: ActionEnum.UPDATE_ARTICLES,
    payload: {
      articles: articles
    }
  };
};