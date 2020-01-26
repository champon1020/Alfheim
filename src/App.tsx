import * as React from "react";
import "./assets/styles/app.css";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import ArticleView from "./components/view/ArticleView";
import HomeView from "./components/view/HomeView";
import CategoryView from "./components/view/CategoryView";

class App extends React.Component {
  render() {
    return(
      <BrowserRouter basename="/">
        <Switch>
          <Route exact path={"/"} component={HomeView} />
          <Route exact path={"/article"} component={ArticleView} />
          <Route exact path={"/category"} component={CategoryView} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
