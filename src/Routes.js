import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import App from './components/App';
import Home from './components/home/Home'
import SignUp from './components/user/SignUp';


const token = localStorage.getItem('jwtToken');

const Routes = (
  <Router>
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={ Home }/>
        <Route exact path="/signup" component={ SignUp }/>
        <Route exact path="/app" render={props => (
          token ? (
            <App {...props} token={token}/>
          ) : (
            <Redirect to="/" />
          )
        )} />
      </Switch>
    </React.Fragment>
  </Router>
)

export default Routes;
