import React, { useCallback } from "react";
import styled from "styled-components";
import ArticleBox from "./ArticleBox";
import { ArticleType } from "../../type";

const ArticleListStyled = styled.ul`
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

const ArticleListElementStyled = styled.li`
  margin: 0 15px 30px 15px;
  @media (max-width: 800px) {
    margin: 0;
    margin-bottom: 40px;
  }
`;

interface ParentProps {
  articles: ArticleType[];
}

type Props = ParentProps;

const ArticleList = (props: Props) => {
  const { articles } = props;
  const articleList = useCallback(
    () => {
      const list = [] as JSX.Element[];
      articles.forEach((v, i) => {
        list.push(
          <ArticleListElementStyled key={i}>
            <ArticleBox article={v} />
          </ArticleListElementStyled>
        );
      });
      return list;
    },
    [articles],
  );

  return(
    <ArticleListStyled>
      {articleList()}
    </ArticleListStyled>
  );
};

export default ArticleList;