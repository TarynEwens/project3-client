import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Redirect } from 'react-router';
import axios from 'axios';
import { Link } from "react-router-dom";

class Adopt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false
    };
  }


  render() {
    return (
      <div>
        <h2 style={{marginTop: '3em' }}>CheesePets Adoption Center</h2>
      </div>
    );
  }
}


export default Adopt;
