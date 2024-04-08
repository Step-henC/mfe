import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

// add ma prefix to css class names to prevent css collision
const generateClassName = createGenerateClassName({
  productionPrefix: "ma",
});
export default ({ history }) => {
  return (
    <div>
      {/* <StylesProvider> //react component that customizes CSS-in-JS stuff */}

      <StylesProvider generateClassName={generateClassName}>
        {/* <BrowserRouter> cannot use browser router (browser history) we need memory history  use Router*/}
        {/* <Router> create memory history in bootstrap.js  */}
        <Router history={history}>
          <Switch>
            <Route exact path="/pricing" component={Pricing} />
            <Route exact path="/" component={Landing} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
