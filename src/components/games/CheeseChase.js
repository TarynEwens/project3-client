import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Redirect } from 'react-router';
import axios from "axios";
import { Link } from "react-router-dom";
import jwtDecoder from "jwt-decode";
import CircularProgress from "material-ui/CircularProgress";
import css from "./Games.css"

import petImage from "./images/hero-pug.png";
import cheeseImage from "./images/cheese.png";

class CheeseChase extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container form-container">
        <div id="modal-overlay">
          <div id="modal">
            <div class="game"></div>
          </div>
        </div>
      </div>
    )
  }
}

    export default CheeseChase;
