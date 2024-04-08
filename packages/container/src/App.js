import React from 'react';

//do not need mount, we refactored to marketingApp component
//import {mount} from 'marketing/MarketingApp'; //from marketing webpackfederation plugin
//mount is not react component so we cannot display it
//we do not want mount to be a react component because we want zero-coupling between 
    //container and child apps. People may forget how react works years from now
//instead mount needs an html element


import MarketingApp from './components/MarketingApp';

export default () => {
    return <div><h1>Hi There! What's Up?</h1><hr/><MarketingApp /></div>
}