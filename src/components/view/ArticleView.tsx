import * as React from "react";
import "../../assets/styles/app.css";
import Header from "../common/Header";
import ImageHeader from "../common/ImageHeader";
import Bar from "../common/Bar";
import Footer from "../common/Footer";
import Article from "../article/Article";
import SideBar from "../common/SideBar";
import Page from "../common/Page";
import { RouteComponentProps } from "react-router-dom";

type RouteProps = RouteComponentProps<{articleId: string | undefined}>;

type Props = RouteProps;

class ArticleView extends React.Component<Props> {
  validArticleId(): number {
    const articleId = this.props.match.params.articleId;
    return articleId === undefined ? -1 : Number.parseInt(articleId);
  }

  render() {
    return(
      <div id="container">
        <header>
          <Header />
          <ImageHeader />
        </header>
        <main>
          <Bar />
          <div id="article-wrapper">
            <div className="order1">
              <Article articleId={this.validArticleId()}/>
              <Page />
            </div>
            <div className="order2">
              <SideBar />
            </div>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default ArticleView;
