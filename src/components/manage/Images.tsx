import * as React from "react";
import ImageList from "./ImageList";
import Page from "../common/Page";

class Images extends React.Component {
  render() {
    return(
      <div id="images-container">
        <ImageList />
        <Page />
      </div>
    );
  }
}

export default Images;