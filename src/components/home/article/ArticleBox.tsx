import Config from "~/config";
import { IArticle } from "~/interfaces";
import React, { useCallback } from "react";
import styled from "styled-components";

import Date from "./Date";
import Description from "./Description";
import Image from "./Image";
import Tags from "./Tags";
import Title from "./Title";

const StyledArticleBox = styled.div`
  --article-box-height: 30vh;
  --article-box-width: calc(var(--container-width) / 4 * 2.7);

  position: relative;
  z-index: 1;
  width: var(--article-box-width);
  height: var(--article-box-height);
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    background-color: var(--hoverred-background-color);
  }
  &:hover img {
    transform: scale(1.1);
  }
  @media (max-width: 750px) {
    width: 100%;
    height: 100%;
  }
`;

const StyledMainArea = styled.div`
  display: flex;
`;

const StyledImageArea = styled.div`
  width: 60%;
`;

const StyledDescriptionArea = styled.div`
  padding: 0 2rem;
  width: 40%;
`;

interface Props {
  article: IArticle;
}

const ArticleBox = (props: Props) => {
  const { article } = props;

  const onClickArticle = useCallback(() => {
    window.location.href = `${Config.origin}/article/${article.id}`;
  }, [article]);

  if (window.innerWidth <= 750) {
    return (
      <StyledArticleBox onClick={onClickArticle}>
        <Image src={article.imageUrl} alt="article box" />
        <Date date={article.createdAt} />
        <Title title={article.title} />
        <Tags tags={article.tags} />
      </StyledArticleBox>
    );
  }

  return (
    <StyledArticleBox onClick={onClickArticle}>
      <Date date={article.createdAt} />
      <StyledMainArea>
        <StyledImageArea>
          <Image src={article.imageUrl} alt="article box" />
        </StyledImageArea>
        <StyledDescriptionArea>
          <Title title={article.title} />
          <Tags tags={article.tags} />
          <Description description={article.content} />
        </StyledDescriptionArea>
      </StyledMainArea>
    </StyledArticleBox>
  );
};

export default ArticleBox;
