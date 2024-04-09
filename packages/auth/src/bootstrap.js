import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {createMemoryHistory, createBrowserHistory} from 'history'
const mount = (element, {onSignIn, onNavigate, defaultHistory, initialPath}) => { //object with key onNavigate

   
    const history = defaultHistory || createMemoryHistory({ //memory history thinks it starts at forward slash {home}
        initialEntries: [initialPath]                       //to prevent having to click login button twice to update browser history and trigger event we need to set an initial state
}); 

    if (onNavigate){ 
        history.listen(onNavigate); 

    }

    ReactDOM.render(
        <App history={history} onSignIn={onSignIn}/>,
        element
    )

    return { //return object for parent container to update this app
        onParentNavigate({pathname: nextPathName}){ //whenever container does something, we want to update this //function in history.listen gives us location obj with destructured prop 'pathname'
                
            const {pathname} = history.location; //destructure pathname
            if (pathname !== nextPathName){ //if current pathname diff from container path
                history.push(nextPathName); //change path
            }
        }
    }
}

if (process.env.NODE_ENV === 'development'){
    const devRoot = document.querySelector('#_auth-dev-root');

    if (devRoot){
        mount(devRoot, {defaultHistory: createBrowserHistory()}); //use BrowserHistory for local development so devs can see url changes and change mount function
    }
}

export { mount};