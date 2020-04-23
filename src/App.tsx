import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store, { persistor } from "./stores/store";
import { Provider } from "react-redux";
import ManageView from "./components/view/ManageView";
import PublicView from "./components/view/PublicView";
import { PersistGate } from "redux-persist/integration/react";
import * as api from "./api/index";
import axios from "axios";
import ErrorPage from "./components/error/ErrorPage";
import Login from "./components/auth/Login";

const config = process.env.REACT_APP_TRAVIS==="true" 
  ? require("./private/config_test.json")
  : require("./private/config.json");

export const Config = process.env.REACT_APP_TRAVIS==="true"
  ? config.test 
  : (process.env.REACT_APP_ALFHEIM_MODE==="dev" 
    ? config.dev
    : config.deploy);

// export const BASE_PATH = process.env.REACT_APP_ALFHEIM_MODE==="dev" 
//   ? "http://localhost:8000".replace(/\/+$/, "")
//   : "https://blog.champonian.com".replace(/\/+$/, "");

export const defaultApi = new api.DefaultApi();
export const ax = axios.create({ 
  baseURL: Config.srcHost
});

export const MathJax = {
  tex: {inlineMath: [["\\$", "\\$"], ["\\(", "\\)"]]},
  svg: {fontCache: "global"}
};

const App = () => {
  return(
    <BrowserRouter basename="/">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Switch>
            <Route exact path={"/"} component={PublicView} />
            <Route exact path={"/home/title/:title"} component={PublicView} />
            <Route exact path={"/home/category/:category"} component={PublicView} />
            <Route exact path={"/home/date/:year/:month"} component={PublicView} />
          
            <Route exact path={"/article/:sortedId"} component={PublicView} />
            <Route exact path={"/article-draft/"} component={PublicView} />
            <Route exact path={"/category/list"} component={PublicView} />

            <Route exact path={"/login"} component={Login} />

            <Route exact path={"/manage"} component={ManageView} />
            <Route exact path={"/manage/:mode"} component={ManageView} />

            <Route component={ErrorPage} />
          </Switch>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default App;