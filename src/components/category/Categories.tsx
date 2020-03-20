import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import CircleChart from "./CircleChart";
import { CategoryType } from "src/type";
import { defaultApi } from "../../App";
import CategoryList from "./CategoryList";

const CategoryListTitle = styled.div`
  color: var(--base-color);
  font-size: 3.6rem;
  margin: 1% 7% 8% 7%;
  & h2 {
    display: inline-block;
    border-bottom: solid thin gray;
  }
  @media (max-width: 800px) {
    text-align: center;
    margin: 1% auto 8% auto;
  }
`;

const CategoryListStyled = styled.div`
  margin-bottom: 10%;
`;

const Categories = () => {
  const [categories, setCategories] = useState([] as CategoryType[]);

  const fetchCategories = useCallback(
    async () => {
      const res = await defaultApi.apiFindCategoryListGet();
      const resCat = res.data.categories;
      setCategories(resCat);
    },
    [],
  );

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  return(
    <CategoryListStyled>
      <CategoryListTitle>
        <h2>Category List</h2>
      </CategoryListTitle>
      <CircleChart 
        categories={categories} 
      />
      <CategoryList
        categories={categories}
      />
    </CategoryListStyled>
  );
};

export default Categories;