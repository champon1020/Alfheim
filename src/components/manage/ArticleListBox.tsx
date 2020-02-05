import * as React from "react";

const ArticleListBox = () => {
  return(
    <div className="article-list-box">
      <div className="article-list-box-title">
        <h2>Sample Article</h2>
        <div className="statement"> 
            This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.This is sample.
        </div>
      </div>
      <div className="article-list-box-image">
        <img src={require("../../assets/images/space.jpg")} alt="img" />
      </div>
      <div className="article-list-box-date">
        <h3>2020-01-31</h3>
      </div>
      <div className="article-list-box-disp-toggle">
        <button>Display</button>
      </div>
      {/* eslint-disable-next-line */}
        <a href="##" className="article-list-box-link"></a>
    </div>
  );
};

export default ArticleListBox;