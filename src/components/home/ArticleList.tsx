import React, { useCallback } from "react";
import styled from "styled-components";
import ArticleBox from "./ArticleBox";
import { ArticleType } from "../../type";

const ArticleListStyled = styled.div`
  margin: auto;
  text-align: center;
  & > ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  & > ul > li {
    margin-bottom: 30px;
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
          <li key={i}>
            <ArticleBox article={v} />
          </li>
        );
      });
      return list;
    },
    [articles],
  );

  return(
    <ArticleListStyled>
      <ul>
        {articleList()}
      </ul>
    </ArticleListStyled>
  );
};

export default ArticleList;