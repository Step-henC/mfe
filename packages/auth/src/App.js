import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";



// add ma prefix to css class names to prevent css collision
const generateClassName = createGenerateClassName({
  productionPrefix: "au",
});
export default ({ history, onSignIn }) => {
  return (
    <div>

      <StylesProvider generateClassName={generateClassName}>
    
        <Router history={history}>
          <Switch>
            {/* <Route path='/auth/signup' component={SignUp} /> REFACTOR to allow signin prop pass down */}
            <Route path="/auth/signin"> 
                <SignIn onSignIn={onSignIn} />
            </Route>

            <Route path='/auth/signup'>
              <SignUp onSignIn={onSignIn}/>
            </Route>

          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
