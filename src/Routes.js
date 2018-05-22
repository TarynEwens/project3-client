import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Nav from './components/header/Nav';
import Home from './components/home/Home';
import SignUp from './components/user/SignUp';
import Adopt from './components/pet/Adopt';
import Login from './components/user/Login';
import EditProfile from './components/user/EditProfile';
import PetProfile from './components/pet/PetProfile';
import RPS from './components/games/RockPaperScissors.js';
import Footer from './components/footer/Footer';


const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: "#5C67E1"
  },
  flatButton: { primaryTextColor: "#5C67E1" }
});

const token = window.localStorage.jwtToken;

const Routes = (
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
  <Router>
    <React.Fragment>
    <Nav />
      <Switch>
        <Route exact path="/" component={ Home }/>
        <Route exact path="/editprofile" render={props => (
          token ? (
            <EditProfile {...props} token={token}/>
          ) : (
            <Redirect to="/login" />
          )
        )} />
        <Route exact path="/adopt" render={props => (
            <Adopt {...props} token={token}/>

        )} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/rps" render={props => (
            <RPS {...props} token={token}/>

        )} />
        <Route exact path="/petprofile" render={props => (
            <PetProfile {...props} token={token}/>

        )} />

      </Switch>
      <Footer />
    </React.Fragment>
  </Router>
  </MuiThemeProvider>
)

export default Routes;
