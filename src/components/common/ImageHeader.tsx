import * as React from "react";
import HeaderImage from "../../assets/images/beach.jpg";

class ImageHeader extends React.Component {
  render(){
    return(
      <div id="image-header">
        <img src={HeaderImage} alt="header" />
      </div>
    );
  }
}

export default ImageHeader;