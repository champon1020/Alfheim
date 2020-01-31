import * as React from "react";

class ArticleListBox extends React.Component {
  render() {
    return(
      <div className="article-list-box">
        {/* eslint-disable-next-line */}
        <a href="##" className="article-list-box-link"></a>
        <div className="article-list-box-title">
          <h2>Sample Article</h2>
          <div className="statement"> 
            This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.
          </div>
        </div>
        <div className="article-list-box-image">
          <img src={require("../../assets/images/profile_image.png")} alt="img" />
        </div>
        <div className="article-list-box-date">
          <h3>2020-01-31</h3>
        </div>
        <div className="article-list-box-disp-toggle">
          <button>Display</button>
        </div>
      </div>
    );
  }
}

export default ArticleListBox;