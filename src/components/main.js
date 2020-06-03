import React from 'react';
import {Switch, Route} from 'react-router-dom';

import LandingPage from './landingpage';
import Verhuis from './Verhuis';
import Typewonning from './typewonning';



const Main =() => (
    <Switch>
        
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/Verhuis" component={Verhuis} />
        <Route exact path="/Typewonning" component={Typewonning} />
    
    </Switch>
)
export default Main;