import * as React from "react";
import SideBarBox from "./SideBarBox";
import styled from "styled-components";

const SideBarListStyled = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const SideBar = () => {
  return(
    <div>
      <SideBarListStyled>
        <li>
          <SideBarBox />
        </li>
        <li>
          <SideBarBox />
        </li>
        <li>
          <SideBarBox />
        </li>
      </SideBarListStyled>
    </div>
  );
};

export default SideBar;