import { ActionEnum } from "./actions";

export const updateRecommendArticles 
= (recommendArticles: Array<{id: number; title: string}>) => 
{
  return {
    type: ActionEnum.UPDATE_RECOMMEND_ARTICLES,
    payload: {
      recommendArticles: recommendArticles
    }
  };
};

export type UpdateRecommendArticlesAction = ReturnType<typeof updateRecommendArticles>