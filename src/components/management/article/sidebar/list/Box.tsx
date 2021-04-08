import TabType from "~/components/management/article/tab";
import { ManagementDraftsMode } from "~/components/management/mode";
import Config from "~/config";
import { IArticle } from "~/interfaces";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";

import Image from "./Image";
import TitleDate from "./TitleDate";

const StyledBox = styled.li`
  position: relative;
  z-index: 2;
  height: var(--management-articles-sidebar-box-height);
  padding: 5px 5px;
  background-color: white;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: 1s;
  &:focus,
  &:hover {
    background-color: var(--hoverred-background-color);
  }
  @media (max-width: 600px) {
    flex-wrap: wrap;
    height: calc(var(--management-articles-sidebar-box-height) * 2.5);
  }
`;

interface Props {
  article: IArticle;
  tab: TabType;
  setFocusedArticle: React.Dispatch<React.SetStateAction<IArticle>>;
  setVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

const Box = (props: Props) => {
  const { article, tab, setFocusedArticle, setVerify } = props;

  const imageUrl = useMemo(() => {
    return article.imageUrl === "" ? Config.defaultImageName : article.imageUrl;
  }, [article.imageUrl]);

  // On focuse listener of article box.
  // Set focues article.
  const onClickArticle = useCallback(() => {
    setFocusedArticle(article);
  }, [article, setFocusedArticle]);

  return (
    <StyledBox onClick={onClickArticle}>
      <Image src={imageUrl} alt={article.title} />
      <TitleDate
        title={article.title}
        date={
          tab === ManagementDraftsMode ? article.updatedAt : article.createdAt
        }
      />
    </StyledBox>
  );
};

export default Box;
