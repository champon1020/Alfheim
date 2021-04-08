import New from "~/components/sidebar/new/New";
import Search from "~/components/sidebar/search/Search";
import React from "react";
import styled from "styled-components";

import Box from "./Box";

const StyledSideBar = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const SideBar = () => {
  return (
    <StyledSideBar>
      <Box title="Search" ContentComponent={Search} />
      <Box title="New" ContentComponent={New} />
    </StyledSideBar>
  );
};

export default SideBar;
