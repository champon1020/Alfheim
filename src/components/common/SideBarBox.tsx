import * as React from "react";

class SideBarBox extends React.Component {
  render() {
    return(
      <div className="side-bar-box">
        <div className="side-bar-title">
          <h3>Side Bar Example</h3>
        </div>
        <div className="side-bar-content">
          <p>
          Side Content ExampleSide Content ExampleSide Content Example
          </p>
        </div>
      </div>
    );
  }
}

export default SideBarBox;