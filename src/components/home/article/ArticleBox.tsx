import { Config } from "~/config";
import { pathJoin } from "~/func";
import { IArticle } from "~/type";
import React, { useCallback } from "react";
import styled from "styled-components";

import Categories from "./Categories";
import Date from "./Date";
import Image from "./Image";
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
    window.location.href = pathJoin(Config.url, "article", article.id);
  }, [article]);

  return (
    <StyledArticleBox onClick={onClickArticle}>
      <Image src={article.imageName} alt="article box" />
      <Date date={article.createdDate} />
      <Title title={article.title} />
      <Categories categories={article.categories} />
    </StyledArticleBox>
  );
};

export default ArticleBox;
