import React, { useEffect } from "react";
import styled from "styled-components";
import CircleChart from "./CircleChart";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/stores/store";
import { CategoryType } from "src/type";
import { defaultApi } from "../../App";
import appActionCreator from "src/actions/actions";

const CategoryListStyled = styled.div`
  margin-bottom: 200px;
  & h2 {
    color: var(--base-color);
    font-size: 3.6rem;
    margin: 10px 70px 80px 70px;
    display: inline-block;
    border-bottom: solid thin gray;
  }
`;

const CategoryList = () => {
  const categories = useSelector<RootState, CategoryType[]>(state => state.categoryReducer.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    defaultApi.apiFindCategoryListGet()
      .then(res => {
        const categories = res.data.categories;
        if(categories === undefined) return;
        dispatch(appActionCreator.updateCategories(categories as CategoryType[]));
      });
  }, [dispatch]);

  return(
    <>
      <CategoryListStyled>
        <h2>Category List</h2>
        <CircleChart categories={categories} />
      </CategoryListStyled>
    </>
  );
};

export default CategoryList;