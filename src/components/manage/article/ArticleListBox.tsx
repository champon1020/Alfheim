import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { ArticleType } from "src/type";
import { formatDateStr, pathJoin } from "src/components/services/parser";
import Button from "./Button";
import { Config, defaultApi } from "src/App";
import { InlineObject3 } from "src/api";

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
  &:focus, &:hover {
    opacity: 0.9;
  }
`;

const ImageBoxStyled = styled.div`
  order: 1;
  width: 30%;
  text-align: left;
  & img {
    height: calc(var(--box-height));
    width: calc(var(--box-height));
  }
`;

const TitleDateStyled = styled.div`
  order: 2;
  width: 50%;
  text-align: left;
  display: flex;
  flex-direction: column;
  & h2 {
    font-size: 1.5rem;
  }
  & h3 {
    margin-top: 4%;
    font-size: 1.2rem;
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
`;

type Props = {
  tab: string;
  article: ArticleType;
  setFocusedArticle: React.Dispatch<React.SetStateAction<ArticleType>>;
}

const ArticleListBox = (props: Props) => {
  const { tab, article, setFocusedArticle } = props;
  const privateButtonColor = useMemo(() => article.isPrivate ? "tomato" : "steelblue", [article]);
  const privateButtonText = useMemo(() => article.isPrivate ? "Private" : "Public", [article]);

  const handleOnClick = useCallback(
    () => {
      setFocusedArticle(article);
    }
    , [article, setFocusedArticle]);

  const handleGoToClick = useCallback(
    () => {
      window.open(Config.host + "/article/" + article.sortedId);
    },
    [article],
  );

  const updateArticle = useCallback(
    async (a: ArticleType) => {
      const body = { article: a } as InlineObject3;
      await defaultApi.apiPrivateUpdateArticleObjectPut(body);
    },[]
  );

  const handleTogglePublicClick = useCallback(
    () => {
      article.isPrivate = !article.isPrivate;
      updateArticle(article);
      window.location.href=pathJoin(Config.host, "manage", "articles");
    },
    [article, updateArticle],
  );

  const deleteDraft = useCallback(
    async (a: ArticleType) => {
      await defaultApi.apiPrivateDeleteDraftDelete(a.id, a.contentHash);
    },[]
  );

  const handleOnDeleteClick = useCallback(
    () => {
      deleteDraft(article);
      window.location.href=pathJoin(Config.host, "manage", "drafts");
    },[article, deleteDraft]
  );

  const buttonElements = useCallback(
    () => {
      if(tab === "drafts"){
        return (
          <ButtonStyled>
            <Button 
              backgroundColor="tomato"
              color="white"
              text="Delete"
              width="100"
              height="40"
              handleOnClick={handleOnDeleteClick} />
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
            handleOnClick={handleTogglePublicClick} />
          <Button 
            backgroundColor="yellowgreen"
            color="white"
            text="Go to"
            width="100"
            height="40"
            handleOnClick={handleGoToClick} />
        </ButtonStyled>
      );
    },[tab, 
      handleGoToClick, 
      handleOnDeleteClick,
      handleTogglePublicClick, 
      privateButtonColor, 
      privateButtonText]
  );

  return(
    <ArticleBoxStyled onClick={handleOnClick}>
      <ImageBoxStyled>
        <img src={pathJoin(Config.srcHost, "images", article.imageHash)} alt="img" />
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