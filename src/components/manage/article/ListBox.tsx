import { defaultApi } from "~/api/entry";
import { formatDateStr, pathJoin } from "~/components/parser";
import { Config } from "~/config";
import { ArticleIface } from "~/type";
import Cookie from "js-cookie";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";

import Button from "./Button";

const ArticleBoxStyled = styled.li`
  --box-height: 80px;
  --box-padding-v: 5px;

  position: relative;
  z-index: 2;
  height: var(--box-height);
  padding: var(--box-padding-v) 5px;
  background-color: white;
  display: flex;
  flex-direction: row;
  border: solid thin lightgray;
  cursor: pointer;
  &:focus,
  &:hover {
    opacity: 0.9;
  }
  @media (max-width: 600px) {
    flex-wrap: wrap;
    height: calc(var(--box-height) * 2.5);
  }
`;

const ImageBoxStyled = styled.div`
  order: 1;
  width: 35%;
  text-align: left;
  & img {
    height: var(--box-height);
    width: 100%;
  }
  @media (max-width: 600px) {
    width: 100%;
    & img {
      height: calc(var(--box-height) * 1.6);
    }
  }
`;

const TitleDateStyled = styled.div`
  order: 2;
  width: 45%;
  text-align: left;
  display: flex;
  flex-direction: column;
  & h2 {
    font-size: 1.5rem;
    padding-left: 1rem;
  }
  & h3 {
    margin-top: 4%;
    font-size: 1.2rem;
    padding-left: 1rem;
  }
  @media (max-width: 600px) {
    width: 70%;
  }
`;

interface Props {
  article: ArticleIface;
  tab: string;
  setFocusedArticle: React.Dispatch<React.SetStateAction<ArticleIface>>;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListBox = (props: Props) => {
  const { article, tab, setFocusedArticle, setVerify } = props;

  const image = useMemo(() => {
    return pathJoin(
      Config.fileUrl,
      "images",
      article.imageHash === "" ? Config.defImg : article.imageHash
    );
  }, [article.imageHash]);

  // On focuse listener of article box.
  // Set focues article.
  const onClickArticle = useCallback(() => {
    setFocusedArticle(article);
  }, [article, setFocusedArticle]);

  return (
    <ArticleBoxStyled onClick={onClickArticle}>
      <ImageBoxStyled>
        <img src={image} alt="img" />
      </ImageBoxStyled>
      <TitleDateStyled>
        <h2>{article.title}</h2>
        <h3>
          {formatDateStr(
            tab == "draft" ? article.updateDate : article.createDate
          )}
        </h3>
      </TitleDateStyled>
      {tab == "draft" ? (
        <DraftButtons draftId={article.id} setVerify={setVerify} />
      ) : (
        <ArticleButtons
          articleId={article.id}
          sortedId={article.sortedId}
          isPrivate={article.isPrivate}
          setVerify={setVerify}
        />
      )}
    </ArticleBoxStyled>
  );
};

export default ListBox;

const ButtonStyled = styled.div`
  order: 3;
  position: relative;
  z-index: 1;
  width: 20%;
  display: flex;
  flex-direction: column;
  & button {
    margin: 5% 0;
  }
  @media (max-width: 600px) {
    width: 30%;
  }
`;

const ArticleButtons = (props: {
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
    <ButtonStyled>
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
    </ButtonStyled>
  );
};

const DraftButtons = (props: {
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
      window.location.href = pathJoin(Config.url, "manage", "drafts");
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
    <ButtonStyled>
      <Button
        backgroundColor="tomato"
        color="white"
        text="Delete"
        width="100"
        height="40"
        handleOnClick={onClickDeleteDraft}
      />
    </ButtonStyled>
  );
};
