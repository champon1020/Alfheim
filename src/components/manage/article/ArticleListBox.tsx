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

type Props = {
  tab: string;
  article: ArticleIface;
  setFocusedArticle: React.Dispatch<React.SetStateAction<ArticleIface>>;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const ArticleListBox = (props: Props) => {
  const { tab, article, setFocusedArticle, setVerify } = props;

  const imageSrc = useMemo(() => {
    return pathJoin(
      Config.srcHost,
      "images",
      article.imageHash === "" ? Config.defImg : article.imageHash
    );
  }, [article.imageHash]);

  const privateButtonColor = useMemo(
    () => (article.isPrivate ? "tomato" : "steelblue"),
    [article]
  );
  const privateButtonText = useMemo(
    () => (article.isPrivate ? "Private" : "Public"),
    [article]
  );

  // Call api of updating article.
  // Return promise.
  const updateArticle = async (a: ArticleIface) => {
    try {
      await defaultApi.apiPrivateUpdateArticlePut(
        { article: a },
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
          },
        }
      );

      // Jump to /manage/articles
      window.location.href = pathJoin(Config.host, "manage", "articles");
    } catch (err) {
      setVerify(false);
    }
  };

  // Call api of deleting draft.
  // Return promise.
  const deleteDraft = async (a: ArticleIface) => {
    try {
      await defaultApi.apiPrivateDeleteDraftDelete(a.id, {
        headers: {
          Authorization: `Bearer ${Cookie.get("alfheim_id_token")}`,
        },
      });

      // Jump to /manage/drafts
      window.location.href = pathJoin(Config.host, "manage", "drafts");
    } catch (err) {
      setVerify(false);
    }
  };

  // On focuse listener of article box.
  // Set focues article.
  const handleOnClick = useCallback(() => {
    setFocusedArticle(article);
  }, [article, setFocusedArticle]);

  // On click listner of 'Go to' button.
  // Jump to the article's page.
  const handleGoToClick = useCallback(() => {
    window.open(`${Config.host}/article/${article.sortedId}`);
  }, [article]);

  // On click listener of 'Public' and 'Private' toggle button.
  // Call api and update state of article.
  // Refresh this page because if not, view would be not updated.
  const handleTogglePublicClick = useCallback(() => {
    updateArticle(article);
    article.isPrivate = !article.isPrivate;
  }, [article, updateArticle]);

  // On click listener of 'Delete' button.
  // Call api.
  // Refresh this page because if not, view would be not updated.
  const handleOnDeleteClick = useCallback(() => {
    deleteDraft(article);
  }, [article, deleteDraft]);

  // Select components of button by the state of tab.
  const buttonElements = useCallback(() => {
    if (tab === "drafts") {
      return (
        <ButtonStyled>
          <Button
            backgroundColor="tomato"
            color="white"
            text="Delete"
            width="100"
            height="40"
            handleOnClick={handleOnDeleteClick}
          />
        </ButtonStyled>
      );
    }

    return (
      <ButtonStyled>
        <Button
          backgroundColor={privateButtonColor}
          color="white"
          text={privateButtonText}
          width="100"
          height="40"
          handleOnClick={handleTogglePublicClick}
        />
        <Button
          backgroundColor="yellowgreen"
          color="white"
          text="Go to"
          width="100"
          height="40"
          handleOnClick={handleGoToClick}
        />
      </ButtonStyled>
    );
  }, [
    tab,
    handleGoToClick,
    handleOnDeleteClick,
    handleTogglePublicClick,
    privateButtonColor,
    privateButtonText,
  ]);

  return (
    <ArticleBoxStyled onClick={handleOnClick}>
      <ImageBoxStyled>
        <img src={imageSrc} alt="img" />
      </ImageBoxStyled>
      <TitleDateStyled>
        <h2>{article.title}</h2>
        <h3>{formatDateStr(article.createDate)}</h3>
      </TitleDateStyled>
      {buttonElements()}
    </ArticleBoxStyled>
  );
};

export default ArticleListBox;
