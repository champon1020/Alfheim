import React, { useCallback } from "react";
import styled from "styled-components";
import { CategoryType } from "src/type";

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

type ParentProps = {
  categories: CategoryType[];
}

type Props = ParentProps;

const ArticleBoxCategory = (props: Props) => {
  const { categories } = props;
  const categoryList = useCallback(
    () => {
      const list = [] as JSX.Element[];
      categories.forEach((v, i) => {
        list.push(
          <li key={i}>
            {v.name}
          </li>
        );
      });
      return list;
    },
    [categories],
  );

  return(
    <CategoryBoxStyled>
      {categoryList()}
    </CategoryBoxStyled>
  );
};

export default ArticleBoxCategory;