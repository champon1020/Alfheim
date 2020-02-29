import { ActionEnum } from "./actions";
import { ArticleType } from "../type";

export const updateArticles = (articles: ArticleType[]) => 
{
  return {
    type: ActionEnum.UPDATE_ARTICLES,
    payload: {
      articles: articles
    }
  };
};

export type UpdateArticlesAction = ReturnType<typeof updateArticles>