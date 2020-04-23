import { ActionEnum } from "./actions";
import { DraftType } from "src/type";

export const updateDraft = (draft: DraftType, contents: string) => {
  return {
    type: ActionEnum.UPDATE_DRAFT,
    payload: {
      article: draft,
      draftContent: contents
    }
  };
};
export type UpdateDraftAction = ReturnType<typeof updateDraft>;

export type ManageActionType = UpdateDraftAction;