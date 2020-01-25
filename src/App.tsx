import * as React from "react";
import "./assets/styles/app.css";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/common/Header";
import ImageHeader from "./components/common/ImageHeader";
import Bar from "./components/common/Bar";
import Footer from "./components/common/Footer";
import Article from "./components/article/Article";

class App extends React.Component {
  render() {
    return(
      <BrowserRouter basename="/">
        <div id="container">
          <header>
            <Header />
            <ImageHeader />
          </header>
          <main>
            <Bar />
            <div id="wrapper">
              <Article />
            </div>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
