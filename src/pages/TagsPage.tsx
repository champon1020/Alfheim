import SideBar from "~/components/common/sidebar/SideBar";
import Tags from "~/components/tag/Tags";
import React, { useEffect } from "react";
import styled from "styled-components";

const StyledMain = styled.div`
  order: 1;
  width: calc(var(--container-width) / 4 * 3);
  @media (max-width: 1000px) {
    width: 800px;
    margin: 0 auto;
  }
  @media (max-width: 750px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const StyledSub = styled.div`
  order: 2;
  width: calc(var(--container-width) / 4);
  @media (max-width: 1000px) {
    width: calc(var(--container-width) / 2.5);
    margin: 10% auto 0 auto;
  }
  @media (max-width: 750px) {
    width: 78%;
  }
`;

const TagsPage = () => {
  return (
    <>
      <StyledMain>
        <Tags />
      </StyledMain>
      <StyledSub>
        <SideBar />
      </StyledSub>
    </>
  );
};

export default TagsPage;
