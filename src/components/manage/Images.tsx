import * as React from "react";
import ImageList from "./ImageList";
import Page from "../common/Page";

const Images = () => {
  return(
    <div id="images-container">
      <ImageList />
      <Page />
    </div>
  );
};

export default Images;