import * as React from "react";

const SideBarBox = () => {
  return(
    <div className="side-bar-box">
      <div className="side-bar-title">
        <h3>Side Bar Example</h3>
      </div>
      <div className="side-bar-content">
        <ul>
          <li>
            <p>Sample article 1</p>
          </li>
          <li>
            <p>Sample aritcle 2</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBarBox;