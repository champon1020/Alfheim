import * as React from "react";
import styled from "styled-components";
import ArticleBox from "./ArticleBox";
import { ArticleType } from "../../types/types";

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

const ArticleList: React.FC<Props> = props => {
  return(
    <ArticleListStyled>
      <ul>
        <li>
          <ArticleBox />
        </li>
        <li>
          <ArticleBox />
        </li>
        <li>
          <ArticleBox />
        </li>
      </ul>
    </ArticleListStyled>
  );
};

export default ArticleList;