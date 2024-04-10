import React, {lazy, Suspense, useState, useEffect} from 'react'; //lazy is a react function and suspense is a component


//do not need mount, we refactored to marketingApp component
//import {mount} from 'marketing/MarketingApp'; //from marketing webpackfederation plugin
//mount is not react component so we cannot display it
//we do not want mount to be a react component because we want zero-coupling between 
    //container and child apps. People may forget how react works years from now
//instead mount needs an html element


// import MarketingApp from './components/MarketingApp';  deleting for lazy and suspense to only load js code when we need it
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

 import Header from './components/Header';
 import Progress from './components/Progress';
import { BrowserRouter, Route, Switch, Router, Redirect } from 'react-router-dom'; //browserrouter creates copy of browser history (url)
                                                    //child apps just use Router (memory history)
import {createBrowserHistory} from 'history'
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles'
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory();

export default () => {

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {

    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn])
    return (
      // challenging to get access from BrowserRouter is hard
    <Router history={history}>
    <StylesProvider generateClassName={generateClassName} >
      <div>
        <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
        {/* Lazy load js files only when needed. Slow network tab internet to "Slow 3G" */}
        <Suspense fallback={Progress}>
        <Switch>
            {/* <Route path="/auth" component={AuthLazy} />  REFACTOR*/}
            <Route path="/auth">
              <AuthLazy onSignIn={() => setIsSignedIn(true)} /> 
            </Route>
            {/* make sure put all routes above otherwise home '/' will be match first! */}
            <Route path='/dashboard'>
              {! isSignedIn && <Redirect to='/'/>}
              <DashboardLazy />
            </Route>
            <Route path="/" component={MarketingLazy} />
           
        </Switch>
        </Suspense>
      </div>
    </StylesProvider>
    </Router>


)
}