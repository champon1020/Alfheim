import Recommend from "~/components//sidebar/Recommend";
import Search from "~/components/sidebar/Search";
import React from "react";
import styled from "styled-components";

import SideBarBox from "./SideBarBox";

const SideBarListStyled = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const SideBar = () => {
  return (
    <div>
      <SideBarListStyled>
        <li>
          <SideBarBox title="Search" ContentComponent={Search} />
        </li>
        <li>
          <SideBarBox title="Pick up" ContentComponent={Recommend} />
        </li>
      </SideBarListStyled>
    </div>
  );
};

export default SideBar;
