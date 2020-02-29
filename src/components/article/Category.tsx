import React, { useCallback } from "react";
import styled from "styled-components";
import { CategoryType } from "src/type";

const CategoryListStyled = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 1.6rem;
  padding: 0;
  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const CategoryListItemStyled = styled.li`
  margin: 0 10px;
  color: brown;
  padding: 1px 5px;
`;

type ParentProps = {
  categories: CategoryType[];
}

type Props = ParentProps;

const Category = (props: Props) => {
  const { categories } = props;

  const categoryList = useCallback(
    () => {
      const list = [] as JSX.Element[];
      categories.forEach((v, i) => {
        list.push(
          <CategoryListItemStyled key={i}>
            {v.name}
          </CategoryListItemStyled>
        );
      });
      return list;
    },
    [categories],
  );

  return(
    <CategoryListStyled>
      {categoryList()}
    </CategoryListStyled>
  );
};

export default Category;