import * as React from "react";

class Bar extends React.Component {
  render() {
    return(
      <div id="common-bar">
        <div className="sns-link-list flex-child">
          <ul>
            <li>twitter</li>
            <li>linkedin</li>
            <li>wantedly</li>
            <li>qiita</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Bar;