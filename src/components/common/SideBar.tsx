import * as React from "react";
import "../../assets/styles/common.css";
import SideBarBox from "./SideBarBox";

class SideBar extends React.Component {
  render() {
    return(
      <div id="side-bar">
        <ul>
          <li>
            <SideBarBox />
          </li>
          <li>
            <SideBarBox />
          </li>
          <li>
            <SideBarBox />
          </li>
        </ul>
      </div>
    );
  }
}

export default SideBar;