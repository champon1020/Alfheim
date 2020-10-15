import { DraftType } from "~/type";

import { ActionEnum } from "./actions";

export const updateDraft = (draft: DraftType, contents: string) => {
  return {
    type: ActionEnum.UPDATE_DRAFT,
    payload: {
      article: draft,
      draftContent: contents,
    },
  };
};
export type UpdateDraftAction = ReturnType<typeof updateDraft>;

export type ManageActionType = UpdateDraftAction;
