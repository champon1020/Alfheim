import React, { useCallback } from "react";
import styled from "styled-components";
import { CategoryType } from "src/type";

const CategoryBoxStyled = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  & li {
    margin-right: 7px;
    font-size: 1.6rem;
    padding: 1px 5px;
    color: brown;
    border: solid 1px brown;
    @media (max-width: 500px) {
      font-size: 1.4rem;
    }
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
      if(categories === null || categories === undefined) return list;
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