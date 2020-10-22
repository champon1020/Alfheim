import Recommend from "~/components//sidebar/Recommend";
import Search from "~/components/sidebar/Search";
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
      <Box title="New" ContentComponent={Recommend} />
    </StyledSideBar>
  );
};

export default SideBar;
