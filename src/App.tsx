import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Configuration, DefaultApi } from "./api";
import Login from "./components/auth/Login";
import ErrorPage from "./components/error/page/ErrorPage";
import ManagementPage from "./pages/ManagementPage";
import PublicPage from "./pages/PublicPage";

const apiConf = new Configuration({ basePath: "http://localhost:8000" });
export const apiHandler = new DefaultApi(apiConf);

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={PublicPage} />
      <Route exact path={"/home/title/:title"} component={PublicPage} />
      <Route exact path={"/home/category/:category"} component={PublicPage} />
      <Route exact path={"/home/date/:year/:month"} component={PublicPage} />

      <Route exact path={"/article/:id"} component={PublicPage} />
      <Route exact path={"/article-draft/"} component={PublicPage} />
      <Route exact path={"/category/list"} component={PublicPage} />

      <Route exact path={"/login"} component={Login} />

      <Route exact path={"/manage"} component={ManagementPage} />
      <Route exact path={"/manage/:mode"} component={ManagementPage} />

      <Route component={ErrorPage} />
    </Switch>
  );
};

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Router />
      </BrowserRouter>
    </>
  );
};

export default App;
