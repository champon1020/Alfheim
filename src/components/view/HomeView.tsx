import * as React from "react";
import "../../assets/styles/app.css";
import Header from "../common/Header";
import ImageHeader from "../common/ImageHeader";
import Bar from "../common/Bar";
import Footer from "../common/Footer";
import ArticlesList from "../home/ArticleList";
import SideBar from "../common/SideBar";
import Page from "../common/Page";

class HomeView extends React.Component {
  render() {
    return(
      <div id="container">
        <header>
          <Header />
          <ImageHeader />
        </header>
        <main>
          <Bar />
          <div id="home-wrapper">
            <div className="order1">
              <ArticlesList />
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

export default HomeView;
