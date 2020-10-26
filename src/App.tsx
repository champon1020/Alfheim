import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "stores/store";

import Login from "./components/auth/Login";
import ErrorPage from "./components/error/ErrorPage";
import ManageView from "./pages/ManageView";
import PublicView from "./pages/PublicView";

const Router = () => {
  return (
    <BrowserRouter basename="/">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Switch>
            <Route exact path={"/"} component={PublicView} />
            <Route exact path={"/home/title/:title"} component={PublicView} />
            <Route
              exact
              path={"/home/category/:category"}
              component={PublicView}
            />
            <Route
              exact
              path={"/home/date/:year/:month"}
              component={PublicView}
            />

            <Route exact path={"/article/:id"} component={PublicView} />
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

const App = () => {
  return (
    <>
      <Router />
    </>
  );
};

export default App;
