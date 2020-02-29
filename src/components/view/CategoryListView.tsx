import React, { useEffect } from "react";
import SideBar from "../common/SideBar";
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
  useEffect(() => {
    window.scroll({
      top: 400,
      behavior: "smooth"
    });
  }, []);

  return(
    <>
      <MainContainer>
        <CategoryList />
      </MainContainer>
      <SubContainer>
        <SideBar />
      </SubContainer>
    </>
  );
};

export default CategoryListView;
