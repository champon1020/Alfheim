import { defaultApi } from "~/api/entry";
import Button from "~/components/manage/article/Button";
import { Config } from "~/config";
import Cookie from "js-cookie";
import React, { useCallback } from "react";

const ButtonsForDraft = (props: {
  draftId: string;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { draftId, setVerify } = props;

  // Call api of deleting draft.
  // Return promise.
  const deleteDraft = async (draftId: string) => {
    try {
      await defaultApi.apiPrivateDeleteDraftDelete(
        { id: draftId },
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
          },
        }
      );

      // Jump to /manage/drafts
      window.location.href = `${Config.url}/manage/drafts`;
    } catch (err) {
      setVerify(false);
    }
  };

  // On click listener of 'Delete' button.
  // Call api.
  // Refresh this page because if not, view would be not updated.
  const onClickDeleteDraft = useCallback(() => {
    deleteDraft(draftId);
  }, [draftId]);

  return (
    <>
      <Button
        backgroundColor="tomato"
        color="white"
        text="Delete"
        width="100"
        height="40"
        handleOnClick={onClickDeleteDraft}
      />
    </>
  );
};

export default ButtonsForDraft;
