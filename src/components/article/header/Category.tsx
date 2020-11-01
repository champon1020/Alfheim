import { ICategory } from "~/type";
import React, { MouseEvent, useCallback } from "react";
import styled from "styled-components";

const StyledCategories = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
  margin: 2rem auto 0 auto;
  font-size: 1.6rem;
  padding: 0;
  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const StyledCategory = styled.li`
  margin: 0.5rem 1rem;
  color: brown;
  border: solid 1px brown;
  padding: 1px 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

type Props = {
  categories: ICategory[];
};

const Category = (props: Props) => {
  const { categories } = props;

  const onClickCategory = useCallback((e: MouseEvent<HTMLLIElement>) => {
    const len = e.currentTarget.classList.length;
    const cid = e.currentTarget.classList[len - 1];
    window.open("/home/category/" + cid, "_self");
  }, []);

  const categoryList = useCallback(() => {
    const list = [] as JSX.Element[];

    if (categories === null || categories === undefined) {
      return list;
    }

    categories.forEach((c, i) => {
      list.push(
        <StyledCategory key={i} className={c.id} onClick={onClickCategory}>
          {c.name}
        </StyledCategory>
      );
    });

    return list;
  }, [categories, onClickCategory]);

  return <StyledCategories>{categoryList()}</StyledCategories>;
};

export default Category;
