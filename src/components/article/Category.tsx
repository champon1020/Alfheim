import React, { useCallback } from "react";
import styled from "styled-components";
import { CategoryType } from "src/type";

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