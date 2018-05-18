import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './images/cheesepets-logo-small.png'
import css from './Nav.css'

// const signOut = function () {

// }

class Nav extends Component {
  _signOut() {
    localStorage.removeItem("jwtToken");
  }

  render() {
    return (
      <header>
        <nav className="nav_bar">

          <Link to="/">
            <img src={logo} alt="CheesePets Logo" id="nav-logo"/>
          </Link>
          <Link to ="#"></Link>

          {/* need to make this not display when on venues page */}

          {window.localStorage.jwtToken ? (
            <div>
            <Link to = "/petprofile" className="navLinkHelp">Your Pet</Link>
            <Link to = "/editprofile" className="navLinkHelp">Settings</Link>
            <Link to ="#"></Link>
            <Link to="/">
              <button className= "signOutNav" onClick={this._signOut}>Sign out</button>
            </Link>
            </div>

          ) : (
            <div>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            </div>
          )}
        </nav>
      </header>
    );
  }
}

export default Nav;
