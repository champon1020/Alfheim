import * as React from "react";
import styled from "styled-components";

const CategoryListStyled = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: center;
  font-size: 22px;
  padding: 0;
`;

const CategoryListItemStyled = styled.li`
  margin: 0 20px;
  background-color: yellowgreen;
  border-radius: 5px;
  padding: 1px 5px;
`;

const Category = () => {
  return(
    <CategoryListStyled>
      <CategoryListItemStyled>
        example
      </CategoryListItemStyled>
      <CategoryListItemStyled>
        example
      </CategoryListItemStyled>
      <CategoryListItemStyled>
        example
      </CategoryListItemStyled>
      <CategoryListItemStyled>
        example
      </CategoryListItemStyled>
      <CategoryListItemStyled>
        example
      </CategoryListItemStyled>
      <CategoryListItemStyled>
        example
      </CategoryListItemStyled>
    </CategoryListStyled>
  );
};

export default Category;