import { TTab } from "~/components/manage/article/Articles";
import { IArticle } from "~/type";
import React, { useCallback } from "react";
import styled from "styled-components";

import ButtonsForArticle from "./ButtonsForArticle";
import ButtonsForDraft from "./ButtonsForDraft";

const StyledButton = styled.div`
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
  tab: TTab;
  article: IArticle;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
};

const ButtonBox = (props: Props) => {
  const { tab, article, setVerify } = props;

  const buttonBox = useCallback(() => {
    if (tab === "drafts") {
      return <ButtonsForDraft draftId={article.id} setVerify={setVerify} />;
    }

    return (
      <ButtonsForArticle
        articleId={article.id}
        sortedId={article.sortedId}
        isPrivate={article.isPrivate}
        setVerify={setVerify}
      />
    );
  }, [tab, article.id, article.sortedId, article.isPrivate]);

  return <StyledButton>{buttonBox()}</StyledButton>;
};

export default ButtonBox;
