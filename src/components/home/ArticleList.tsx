import * as React from "react";
import "../../assets/styles/article_list.css";
import ArticleBox from "./ArticleBox";
import { ArticleType } from "../../types/types";

interface ParentProps {
  articles: ArticleType[];
}

type Props = ParentProps;

class ArticlesList extends React.Component<Props> {
  render() {
    return(
      <div id="article-list">
        <ul>
          <li>
            <ArticleBox />
          </li>
          <li>
            <ArticleBox />
          </li>
          <li>
            <ArticleBox />
          </li>
        </ul>
      </div>
    );
  }
}

export default ArticlesList;