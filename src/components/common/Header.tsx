import * as React from "react";
import "../../assets/styles/common.css";
import LinkWord from "./LinkWord";

class Header extends React.Component {
  render() {
    return(
      <div id="common-header">
        <h1>
          <LinkWord text="Cham Cham ChamPon" href="##" className={undefined} id={undefined} />
        </h1>
        <nav id="common-nav">
          <ul id="common-nav-list">
            <li>
              <LinkWord text="Category" href="##" className={undefined} id={undefined} />
            </li>
            <li>
              <LinkWord text="Portfolio" href="##" className={undefined} id={undefined} />
            </li>
            <li>
              <LinkWord text="Archives" href="##" className={undefined} id={undefined} />
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;