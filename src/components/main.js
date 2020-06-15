import React from 'react';
import {Switch, Route} from 'react-router-dom';

import LandingPage from './landingpage';
import Verhuis from './Verhuis';
import Typewonning from './typewonning'
import Test from './test';
import Test1 from './test1';



const Main =() => (
    <Switch>
        
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/Verhuis" component={Verhuis} />
        <Route exact path="/Typewonning" component={Typewonning} />
        <Route exact path="/Test" component={Test} />
        <Route exact path="/Test1" component={Test1} />
    
    </Switch>
)
export default Main;