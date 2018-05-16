import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import App from './components/App';
import Home from './components/home/Home'
import SignUp from './components/user/SignUp';
import EditProfile from './components/user/EditProfile';
import Login from './components/user/Login';

const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: "#5C67E1"
  },
  flatButton: { primaryTextColor: "#5C67E1" }
});

const token = localStorage.getItem('jwtToken');

const Routes = (
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
  <Router>
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={ Home }/>
        <Route exact path="/editprofile" render={props => (
          token ? (
            <EditProfile {...props} token={token}/>
          ) : (
            <Redirect to="/login" />
          )
        )} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
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
  </MuiThemeProvider>
)

export default Routes;
