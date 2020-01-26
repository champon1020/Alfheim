import * as React from "react";
import "./assets/styles/app.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ArticleView from "./components/view/ArticleView";
import HomeView from "./components/view/HomeView";
import CategoryListView from "./components/view/CategoryListView";
import { store } from "./stores/store";
import { Provider } from "react-redux";
import ManageView from "./components/view/ManageView";

class App extends React.Component {
  render() {
    return(
      <BrowserRouter basename="/">
        <Provider store={store}>
          <Switch>
            <Route exact path={"/"} component={HomeView} />
            <Route exact path={"/page/:page"} component={HomeView} />
            <Route exact path={"/category/id/:categoryId"} component={HomeView} />
            <Route exact path={"/category/id/:categoryId/page/:page"} component={HomeView} />
            <Route exact path={"/date/:year/:month"} component={HomeView} />
            <Route exact path={"/date/:year/:month/page/:page"} component={HomeView} />
          
            <Route exact path={"/article/:id"} component={ArticleView} />
            <Route exact path={"/category/list"} component={CategoryListView} />

            <Route exact path={"/manage"} component={ManageView} />
            <Route exact path={"/manage/:mode"} component={ManageView} />
          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
