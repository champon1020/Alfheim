import { Action } from "redux";
import { ActionEnum } from "./actions";

export interface UpdateRecommendArticlesAction extends Action 
{
  type: ActionEnum.UPDATE_RECOMMEND_ARTICLES;
  payload: {
    recomArticles: Array<{
      id: number;
      title: string;
    }>;
  };
}

export type UpdateRecommendArticlesActionType = UpdateRecommendArticlesAction;

export const updateRecommendArticles 
= (recomArticles: Array<{id: number; title: string}>): UpdateRecommendArticlesAction => 
{
  return {
    type: ActionEnum.UPDATE_RECOMMEND_ARTICLES,
    payload: {
      recomArticles: recomArticles
    }
  };
};