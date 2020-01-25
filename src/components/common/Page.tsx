import * as React from "react";
import "../../assets/styles/common.css";

class Page extends React.Component {
  render() {
    return(
      <div id="page-container">
        <ul className="page-component">
          <li className="page-element">BackBackBackBackBackBack</li>
          <li className="page-element">1</li>
          <li className="page-element">NextNextNextNextNextNext</li>
        </ul>
      </div>
    );
  }
}

export default Page;