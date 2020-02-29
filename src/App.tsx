import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store, { persistor } from "./stores/store";
import { Provider } from "react-redux";
import ManageView from "./components/view/ManageView";
import PublicView from "./components/view/PublicView";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return(
    <BrowserRouter basename="/">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Switch>
            <Route exact path={"/"} component={PublicView} />
            <Route exact path={"/home/category/:categoryId"} component={PublicView} />
            <Route exact path={"/home/date/:year/:month"} component={PublicView} />
          
            <Route exact path={"/article/:articleId"} component={PublicView} />
            <Route exact path={"/category/list"} component={PublicView} />

            <Route exact path={"/manage"} component={ManageView} />
            <Route exact path={"/manage/:mode"} component={ManageView} />
          </Switch>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default App;