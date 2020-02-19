import * as React from "react";
import styled from "styled-components";

const CategoryBoxStyled = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0 15px;
  list-style: none;
  flex-wrap: none;
  & li {
    background-color: greenyellow;
    margin: 0 5px;
    font-size: 20px;
    border-radius: 3px;
    padding: 1px 5px;
  }
`;

const ArticleBoxCategory: React.FC = () => {
  return(
    <div>
      <CategoryBoxStyled>
        <li>example</li>
        <li>example</li>
        <li>example</li>
        <li>example</li>
        <li>example</li>
        <li>example</li>
        <li>example</li>
      </CategoryBoxStyled>
    </div>
  );
};

export default ArticleBoxCategory;