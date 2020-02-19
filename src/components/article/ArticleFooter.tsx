import * as React from "react";
import styled from "styled-components";

const ArticleFooterStyled = styled.div`
  height: 50px;
`;

const ArticleShareBoxStyled = styled.div`
  margin-bottom: 50px;
  & ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0;
    padding: 0;
  }
  & li {
    text-align: center;
    font-size: 22px;
    margin: 0 30px;
    background-color: orange;
    width: 40px;
    height: 40px;
  }
`;

const ArticleFooter = () => {
  return(
    <ArticleFooterStyled>
      <ArticleShareBoxStyled>
        <ul>
          <li>tw</li>
          <li>fb</li>
          <li>insta</li>
        </ul>
      </ArticleShareBoxStyled>
    </ArticleFooterStyled>
  );
};

export default ArticleFooter;