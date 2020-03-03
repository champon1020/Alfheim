import { CategoryType } from "src/type";
import { ActionEnum } from "./actions";

export const updateCategories = (categories: CategoryType[]) => 
{
  return {
    type: ActionEnum.UPDATE_CATEGORIES,
    payload: {
      categories: categories
    }
  };
};

export type UpdateCategoriesAction = ReturnType<typeof updateCategories>