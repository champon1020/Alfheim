import Button from "~/components/management/article/Button";
import Config from "~/config";
import { apiHandlerWithToken } from "~/util/api";
import React, { useCallback, useMemo } from "react";

const ButtonsForArticle = (props: {
  articleId: string;
  status: number;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { articleId, status, setVerify } = props;

  const privateButtonColor = useMemo(
    () => (status == 0 ? "tomato" : "steelblue"),
    [status]
  );

  const privateButtonText = useMemo(
    () => (status == 0 ? "Private" : "Public"),
    [status]
  );

  // On click listner of 'Go to' button.
  // Jump to the article's page.
  const onClickJumpToArticle = useCallback(() => {
    window.open(`${Config.origin}/article/${articleId}`);
  }, [articleId]);

  // On click listener of 'Public' and 'Private' toggle button.
  // Call api and update state of article.
  // Refresh this page because if not, view would be not updated.
  const togglePrivate = () => {
    const updateArticleStatusRequestBody = { id: articleId, status: status };
    apiHandlerWithToken()
      .apiV3PrivateUpdateArticleStatusPut({ updateArticleStatusRequestBody })
      .then((res: any) => {
        window.location.href = `${Config.origin}/management/articles`;
      })
      .catch((err: any) => {
        if (err.code.status == 400) {
          setVerify(false);
        }
      });
  };

  const gotoButton = useMemo(() => {
    if (status == 1) {
      return (
        <Button
          backgroundColor="yellowgreen"
          color="white"
          text="Go to"
          width="100"
          height="40"
          handleOnClick={onClickJumpToArticle}
        />
      );
    }
  }, [status]);

  return (
    <>
      <Button
        backgroundColor={privateButtonColor}
        color="white"
        text={privateButtonText}
        width="100"
        height="40"
        handleOnClick={togglePrivate}
      />
      {gotoButton}
    </>
  );
};

export default ButtonsForArticle;
