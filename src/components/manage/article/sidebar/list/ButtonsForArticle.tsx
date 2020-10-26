import { defaultApi } from "~/api/entry";
import Button from "~/components/manage/article/Button";
import { Config } from "~/config";
import { bearerAuthHeader, pathJoin } from "~/func";
import Cookie from "js-cookie";
import React, { useCallback, useMemo } from "react";

const ButtonsForArticle = (props: {
  articleId: string;
  _private: boolean;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { articleId, _private, setVerify } = props;

  const privateButtonColor = useMemo(
    () => (_private ? "tomato" : "steelblue"),
    [_private]
  );

  const privateButtonText = useMemo(() => (_private ? "Private" : "Public"), [
    _private,
  ]);

  // Call api of updating article.
  // Return promise.
  const apiTogglePrivate = async (articleId: string, _private: boolean) => {
    const req = { id: articleId, _private: !_private };

    try {
      await defaultApi.apiPrivateUpdateArticlePrivatePut(req, {
        headers: bearerAuthHeader(),
      });

      // Jump to /manage/articles
      window.location.href = pathJoin(Config.url, "manage", "articles");
    } catch (err) {
      setVerify(false);
    }
  };

  // On click listner of 'Go to' button.
  // Jump to the article's page.
  const onClickJumpToArticle = useCallback(() => {
    window.open(`${Config.url}/article/${articleId}`);
  }, [articleId]);

  // On click listener of 'Public' and 'Private' toggle button.
  // Call api and update state of article.
  // Refresh this page because if not, view would be not updated.
  const togglePrivate = () => {
    apiTogglePrivate(articleId, _private);
  };

  const gotoButton = useMemo(() => {
    if (!_private) {
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
  }, [_private]);

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
