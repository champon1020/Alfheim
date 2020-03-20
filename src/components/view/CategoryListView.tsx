import React, { useEffect } from "react";
import SideBar from "../common/SideBar";
import Categories from "../category/Categories";
import styled from "styled-components";

const MainContainer = styled.div`
  order: 1;
  width: calc(var(--container-width) / 4 * 3);
  @media (max-width: 1000px) {
    width: 800px;
    margin: 0 auto;
  }
  @media (max-width: 800px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const SubContainer = styled.div`
  order: 2;
  width: calc(var(--container-width) / 4);
  @media (max-width: 1000px) {
    width: calc(var(--container-width) / 2.5);
    margin: 10% auto 0 auto;
  }
  @media (max-width: 800px) {
    width: 78%;
  }
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
        <Categories />
      </MainContainer>
      <SubContainer>
        <SideBar />
      </SubContainer>
    </>
  );
};

export default CategoryListView;
