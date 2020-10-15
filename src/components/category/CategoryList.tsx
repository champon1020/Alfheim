import React, { useCallback, MouseEvent } from "react";
import styled from "styled-components";
import { CategoryType } from "~/type";

const CategoryListContainer = styled.ul`
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

const CategoryListItem = styled.li`
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

const EmptyMessage = styled.h3`
  font-size: 2.4rem;
  color: gray;
  margin: 5% auto 5% auto;
`;

type Props = {
  categories: CategoryType[];
}

const CategoryList = (props: Props) => {
  const { categories } = props;

  const handleOnClick = useCallback(
    (e: MouseEvent<HTMLLIElement>) => {
      const len = e.currentTarget.classList.length;
      const cName = e.currentTarget.classList[len-1];
      window.open("/home/category/" + cName, "_self");
    },
    [],
  );

  const categoryList = useCallback(
    () => {
      if(categories === undefined 
        || categories === null
        || categories.length === 0){
        return (
          <EmptyMessage>
            {"No Categories"}
          </EmptyMessage>
        );
      }
      const list = [] as JSX.Element[];
      categories.forEach((v, i) => {
        list.push(
          <CategoryListItem
            key={i}
            className={v.name}
            onClick={handleOnClick}>
            {v.name + "(" + v.articleNum + ")"}
          </CategoryListItem>
        );
      });
      return list;
    },
    [categories, handleOnClick],
  );

  return (
    <CategoryListContainer>
      {categoryList()}
    </CategoryListContainer>
  );
};

export default CategoryList;
