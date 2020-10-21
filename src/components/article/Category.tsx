import { CategoryIface } from "~/type";
import React, { MouseEvent, useCallback } from "react";
import styled from "styled-components";

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
  border: solid 1px brown;
  padding: 1px 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  categories: CategoryIface[];
};

const Category = (props: Props) => {
  const { categories } = props;

  const onClickCategory = useCallback((e: MouseEvent<HTMLLIElement>) => {
    const len = e.currentTarget.classList.length;
    const cName = e.currentTarget.classList[len - 1];
    window.open("/home/category/" + cName, "_self");
  }, []);

  const categoryList = useCallback(() => {
    const list = [] as JSX.Element[];

    if (categories === null || categories === undefined) {
      return list;
    }

    categories.forEach((v, i) => {
      list.push(
        <CategoryListItemStyled
          key={i}
          className={v.name}
          onClick={onClickCategory}
        >
          {v.name}
        </CategoryListItemStyled>
      );
    });

    return list;
  }, [categories, onClickCategory]);

  return <CategoryListStyled>{categoryList()}</CategoryListStyled>;
};

export default Category;
