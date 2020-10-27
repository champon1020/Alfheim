import { ICategory } from "~/type";
import React, { MouseEvent, useCallback } from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  margin-top: 10%;
  padding: 0 15%;
  @media (max-width: 800px) {
    margin: 0;
    margin-top: 10%;
  }
  @media (max-width: 500px) {
    padding: 0;
  }
`;

const StyledCategory = styled.li`
  font-size: 2.5rem;
  margin: 2%;
  border: solid thin brown;
  color: brown;
  padding: 0 1%;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const StyledEmptyMsg = styled.h3`
  font-size: 2.4rem;
  color: gray;
  margin: 5% auto 5% auto;
`;

type Props = {
  categories: ICategory[];
};

const CategoryList = (props: Props) => {
  const { categories } = props;

  const onClickCategory = useCallback((e: MouseEvent<HTMLLIElement>) => {
    const len = e.currentTarget.classList.length;
    const cName = e.currentTarget.classList[len - 1];
    window.open("/home/category/" + cName, "_self");
  }, []);

  const categoryList = useCallback(() => {
    if (
      categories === undefined ||
      categories === null ||
      categories.length === 0
    ) {
      return <StyledEmptyMsg>{"No Categories"}</StyledEmptyMsg>;
    }

    const list = [] as JSX.Element[];

    categories.forEach((v, i) => {
      list.push(
        <StyledCategory key={i} className={v.name} onClick={onClickCategory}>
          {v.name + "(" + v.articleNum + ")"}
        </StyledCategory>
      );
    });

    return list;
  }, [categories, onClickCategory]);

  return <StyledList>{categoryList()}</StyledList>;
};

export default CategoryList;
