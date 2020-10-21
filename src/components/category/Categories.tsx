import { defaultApi } from "~/api/entry";
import { ICategory } from "~/type";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import CategoryList from "./CategoryList";
import CircleChart from "./CircleChart";

const StyledTitle = styled.div`
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

const StyledCategories = styled.div`
  margin-bottom: 10%;
`;

const Categories = () => {
  const [categories, setCategories] = useState([] as ICategory[]);

  // Fetch categories.
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await defaultApi.apiFindCategoryListGet();
        setCategories(res.data.categories);
      } catch (err) {
        // handle error
      }
    };

    fetchCategories();
  }, []);

  return (
    <StyledCategories>
      <StyledTitle>
        <h2>Category List</h2>
      </StyledTitle>
      <CircleChart categories={categories} />
      <CategoryList categories={categories} />
    </StyledCategories>
  );
};

export default Categories;
