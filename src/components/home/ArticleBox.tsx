import * as React from "react";
import image from "../../assets/images/coming_soon.jpg";
import ArticleBoxCategory from "./ArticleBoxCategory";

class ArticleBox extends React.Component {
  render() {
    return(
      <div className="article-box">
        <img src={image} alt="article box" />
        <div className="article-box-date">
          <p>2020-01-26</p>
        </div>
        <div className="article-box-category">
          <ArticleBoxCategory />
        </div>
        <div className="article-box-title">
          <h3>Article Box Title.Article Box Title.Article Box Title.Article Box Title.</h3>
        </div>

        {/* eslint-disable-next-line */}
        <a href="##" className="article-box-link"></a>
      </div>
    );
  }
}

export default ArticleBox;