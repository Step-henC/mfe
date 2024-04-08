import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {createMemoryHistory, createBrowserHistory} from 'history'
const mount = (element, {onNavigate, defaultHistory}) => { //object with key onNavigate

    //we only get default history in development so devs can see URL on link clicks
    //if given default history, use it, else use memory history 
    const history = defaultHistory || createMemoryHistory(); //use memory history not browser history for child MFEs for Router in Appjs

    if (onNavigate){ //onNavigate not provided in local development
        history.listen(onNavigate); //history object has an event listener tied to it called "listen", we need this for container and marketing to hear url changes

    }

    ReactDOM.render(
        <App history={history}/>,
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
    const devRoot = document.querySelector('#_marketing-dev-root');

    if (devRoot){
        mount(devRoot, {defaultHistory: createBrowserHistory()}); //use BrowserHistory for local development so devs can see url changes and change mount function
    }
}

export { mount};