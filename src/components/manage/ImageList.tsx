import * as React from "react";

const ImageList = () => {
  return(
    <div id="image-list-container">
      <ul>
        <li>
          {/* eslint-disable-next-line */}
            <img src={require("../../assets/images/profile_image.png")} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <img src={require("../../assets/images/manage-wall.jpg")} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <img src={require("../../assets/images/manage-wall.jpg")} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <img src={require("../../assets/images/manage-wall.jpg")} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <img src={require("../../assets/images/profile_image.png")} />
        </li>
        <li>
          {/* eslint-disable-next-line */}
            <img src={require("../../assets/images/manage-wall.jpg")} />
        </li>
      </ul>
    </div>
  );
};

export default ImageList;