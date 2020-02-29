import * as React from "react";
import SideBarBox from "./SideBarBox";
import styled from "styled-components";
import Recommend from "../sidebar/Recommend";
import Search from "../sidebar/Search";

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
          <SideBarBox ContentComponent={Search} />
        </li>
        <li>
          <SideBarBox ContentComponent={Recommend}/>
        </li>
      </SideBarListStyled>
    </div>
  );
};

export default SideBar;