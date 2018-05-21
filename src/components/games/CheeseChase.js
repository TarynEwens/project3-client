import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Redirect } from 'react-router';
import axios from "axios";
import { Link } from "react-router-dom";
import jwtDecoder from "jwt-decode";
import CircularProgress from "material-ui/CircularProgress";
import css from "./Games.css";
import { Loop, Stage, Game } from 'react-game-kit';
import ReactDOM from 'react-dom';
import App from '../../components/App.js';
import petImage from "./images/hero-pug.png";
import cheeseImage from "./images/cheese.png";













class CheeseChase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 265,
      cheese: {},
      cheesesCaught: 0
    }
  }

  componentDidMount() {
    ReactDOM.render(
      <App/>,
      document.querySelector('.app')
    )
  }


  render() {
    return (
      <div className="container form-container">
        <div className="pet-container">
          <div className="game">
            <h2>Cheese Chase</h2>
            <div className="app"></div>
            <div className="helper">Press a key or tap on mobile </div>
          </div>
        </div>
      </div>
    )
  }
}

    export default CheeseChase;
