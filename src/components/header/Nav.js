import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Nav.css'


class Nav extends Component {
  _signOut() {
    localStorage.removeItem("jwtToken");
  }

  render() {
    return (
      <header>
        <nav className="nav_bar" id="nav_bar">

          <Link to="/">
            <h1>CheesePets</h1>
          </Link>
          <Link to ="#"></Link>

          {window.localStorage.jwtToken ? (
            <div>
            <Link to = "/petprofile" className="navLinkHelp">Your Pet</Link>
            <Link to = "/rps" className="navLinkHelp">Find Cheese</Link>
            <Link to = "/editprofile" className="navLinkHelp">Settings</Link>

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
