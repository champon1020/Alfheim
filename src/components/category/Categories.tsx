import { defaultApi } from "~/App";
import { CategoryType } from "~/type";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import CategoryList from "./CategoryList";
import CircleChart from "./CircleChart";

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

  useEffect(() => {
    defaultApi.apiFindCategoryListGet().then((res) => {
      setCategories(res.data.categories);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <CategoryListStyled>
      <CategoryListTitle>
        <h2>Category List</h2>
      </CategoryListTitle>
      <CircleChart categories={categories} />
      <CategoryList categories={categories} />
    </CategoryListStyled>
  );
};

export default Categories;
