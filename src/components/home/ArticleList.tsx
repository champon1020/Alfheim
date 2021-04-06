import ArticleBox from "~/components/home/article/ArticleBox";
import { IArticle } from "~/interfaces";
import React, { useMemo } from "react";
import styled from "styled-components";

const StyledArticleList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 1000px) {
    justify-content: center;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const StyledArticle = styled.li`
  margin: 0 15px 30px 15px;
  @media (max-width: 800px) {
    margin: 0;
    margin-bottom: 40px;
  }
`;

const StyledEmptyMsg = styled.h3`
  font-size: 2.4rem;
  color: gray;
  margin: 5% auto 15% auto;
`;

interface Props {
  articles: IArticle[];
}

const ArticleList = (props: Props) => {
  const { articles } = props;

  const articleList = useMemo(() => {
    const list = [] as JSX.Element[];
    if (articles == undefined || articles.length === 0) {
      return <StyledEmptyMsg>{"No Articles"}</StyledEmptyMsg>;
    }

    articles.forEach((v, i) => {
      list.push(
        <StyledArticle key={i}>
          <ArticleBox article={v} />
        </StyledArticle>
      );
    });

    return list;
  }, [articles]);

  return <StyledArticleList>{articleList}</StyledArticleList>;
};

export default ArticleList;
