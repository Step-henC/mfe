import React from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import {StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

import Landing from './components/Landing'
import Pricing from './components/Pricing'

// add ma prefix to css class names to prevent css collision
const generateClassName = createGenerateClassName({ 
    productionPrefix: 'ma'
})
export default () => {
    return <div>
        {/* <StylesProvider> //react component that customizes CSS-in-JS stuff */}
      
        <StylesProvider generateClassName={generateClassName}>

            <BrowserRouter>
            <Switch>
                <Route exact path="/pricing" component={Pricing} />
                <Route exact path="/" component={Landing} />


            </Switch>
            </BrowserRouter>
        </StylesProvider>
    </div>
}