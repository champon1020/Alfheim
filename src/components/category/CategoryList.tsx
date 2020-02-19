import * as React from "react";
import styled from "styled-components";

const CategoryListStyled = styled.div`
  margin-bottom: 200px;
  & h2 {
    font-size: 36px;
    margin: 10px 70px 50px 70px;
    display: inline-block;
    border-bottom: solid thin gray;
  }
  & ul {
    list-style: none;
    font-size: 24px;
    display: flex;
    flex-direction: row;
  }
  & li {
    margin: 0 10px;
    background-color: greenyellow;
    padding: 2px 5px;
    border-radius: 5px;
  }
`;

const CategoryList = () => {
  return(
    <div>
      <CategoryListStyled>
        <h2>Category List</h2>
        <ul>
          <li>Category1(1)</li>
          <li>Category2(2)</li>
        </ul>
      </CategoryListStyled>
      <div id="others">
      </div>
    </div>
  );
};

export default CategoryList;