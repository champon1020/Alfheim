import * as React from "react";
import styled from "styled-components";
import CircleChart from "./CircleChart";

const CategoryListStyled = styled.div`
  margin-bottom: 200px;
  & h2 {
    color: var(--base-color);
    font-size: 3.6rem;
    margin: 10px 70px 80px 70px;
    display: inline-block;
    border-bottom: solid thin gray;
  }
`;

const CategoryList = () => {
  return(
    <>
      <CategoryListStyled>
        <h2>Category List</h2>
        <CircleChart />
      </CategoryListStyled>
    </>
  );
};

export default CategoryList;