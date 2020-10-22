import { defaultApi } from "~/api/entry";
import Button from "~/components/manage/article/Button";
import { Config } from "~/config";
import { pathJoin } from "~/func";
import Cookie from "js-cookie";
import React, { useCallback, useMemo } from "react";

const ButtonsForArticle = (props: {
  articleId: string;
  sortedId: number;
  isPrivate: boolean;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { articleId, sortedId, isPrivate, setVerify } = props;

  const privateButtonColor = useMemo(
    () => (isPrivate ? "tomato" : "steelblue"),
    [isPrivate]
  );
  const privateButtonText = useMemo(() => (isPrivate ? "Private" : "Public"), [
    isPrivate,
  ]);

  // Call api of updating article.
  // Return promise.
  const updateArticle = async (articleId: string, isPrivate: boolean) => {
    try {
      // TODO: fix api
      await defaultApi.apiPrivateUpdateArticleIsPrivatePut(
        { id: articleId, isPrivate: isPrivate },
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
          },
        }
      );

      // Jump to /manage/articles
      window.location.href = pathJoin(Config.url, "manage", "articles");
    } catch (err) {
      setVerify(false);
    }
  };

  // On click listner of 'Go to' button.
  // Jump to the article's page.
  const onClickJumpToArticle = useCallback(() => {
    window.open(`${Config.url}/article/${sortedId}`);
  }, [sortedId]);

  // On click listener of 'Public' and 'Private' toggle button.
  // Call api and update state of article.
  // Refresh this page because if not, view would be not updated.
  const togglePublicPrivate = useCallback(() => {
    updateArticle(articleId, isPrivate);
  }, [articleId, isPrivate]);

  return (
    <>
      <Button
        backgroundColor={privateButtonColor}
        color="white"
        text={privateButtonText}
        width="100"
        height="40"
        handleOnClick={togglePublicPrivate}
      />
      <Button
        backgroundColor="yellowgreen"
        color="white"
        text="Go to"
        width="100"
        height="40"
        handleOnClick={onClickJumpToArticle}
      />
    </>
  );
};

export default ButtonsForArticle;
