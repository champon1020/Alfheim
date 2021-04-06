import Config from "~/config";
import { IArticle } from "~/interfaces";
import React, { useCallback } from "react";
import styled from "styled-components";

import Date from "./Date";
import Image from "./Image";
import Tags from "./Tags";
import Title from "./Title";

const StyledArticleBox = styled.div`
  position: relative;
  z-index: 1;
  width: calc(var(--container-width) / 8 * 2.7);
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:hover img {
    transform: scale(1.1);
  }
  @media (max-width: 800px) {
    width: 100%;
    height: 100%;
  }
`;

interface Props {
  article: IArticle;
}

const ArticleBox = (props: Props) => {
  const { article } = props;

  const onClickArticle = useCallback(() => {
    window.location.href = `${Config.origin}/article/${article.id}`;
  }, [article]);

  return (
    <StyledArticleBox onClick={onClickArticle}>
      <Image src={article.imageUrl} alt="article box" />
      <Date date={article.createdAt} />
      <Title title={article.title} />
      <Tags tags={article.tags} />
    </StyledArticleBox>
  );
};

export default ArticleBox;
