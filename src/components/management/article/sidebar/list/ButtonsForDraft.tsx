import Button from "~/components/management/article/Button";
import Config from "~/config";
import { apiHandlerWithToken } from "~/util/api";
import React, { useCallback } from "react";

const ButtonsForDraft = (props: {
  draftId: string;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { draftId, setVerify } = props;

  // On click listener of 'Delete' button.
  // Call api.
  // Refresh this page because if not, view would be not updated.
  const onClickDeleteDraft = useCallback(() => {
    const deleteArticleRequestBody = { id: draftId };
    apiHandlerWithToken()
      .apiV3PrivateDeleteArticleDelete({ deleteArticleRequestBody })
      .then((res: any) => {
        window.location.href = `${Config.origin}/management/drafts`;
      })
      .catch((err: any) => {
        if (err.code.status == 400) {
          setVerify(false);
        }
      });
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
