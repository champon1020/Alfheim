import * as React from "react";
import SideBar from "../common/SideBar";
import Page from "../common/Page";
import CategoryList from "../category/CategoryList";
import styled from "styled-components";

const MainContainer = styled.div`
  order: 1;
  width: 78%;
  margin-right: 10px;
`;

const SubContainer = styled.div`
  order: 2;
  width: 22%;
  margin-left: 10px;
`;

const CategoryListView = () => {
  return(
    <>
      <MainContainer>
        <CategoryList />
        <Page />
      </MainContainer>
      <SubContainer>
        <SideBar />
      </SubContainer>
    </>
  );
};

export default CategoryListView;
