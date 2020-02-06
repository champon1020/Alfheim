import * as React from "react";
import HeaderImage from "../../assets/images/beach.jpg";

const ImageHeader = () => {
  return(
    <div id="image-header">
      <img src={HeaderImage} alt="header" />
    </div>
  );
};

export default ImageHeader;