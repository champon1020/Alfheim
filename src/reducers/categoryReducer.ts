import { CategoriesState } from "src/stores/store";
import { Reducer } from "react";
import { UpdateCategoriesAction } from "src/actions/categoryAction";
import { ActionEnum } from "src/actions/actions";

export const initCategoriesState: CategoriesState = {
  categories: []
};

const categoryReducer: Reducer<CategoriesState, UpdateCategoriesAction> = (
  state = initCategoriesState,
  action: UpdateCategoriesAction
): CategoriesState => {
  switch(action.type) {
  case ActionEnum.UPDATE_CATEGORIES: {
    const thisAction: UpdateCategoriesAction = action;
    return {
      categories: thisAction.payload.categories
    };
  }
  default:
    return state;
  }
};

export default categoryReducer;