import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Redirect } from 'react-router';
import axios from 'axios';
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false
    };
  }

  handleClick = () => {
    let url = "https://cheesepets-db.herokuapp.com/user_token";

    let postData = {
          auth: {
          email: this.state.email,
          password: this.state.password
        }
    }

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    }

    axios.post(url, postData, axiosConfig)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        let token = res.data.jwt;
        localStorage.setItem('jwtToken', token);
        if(res.status === 201) {
          this.setState({redirect: true})
          console.log(this.state.redirect);
          this.props.history.push("/petprofile");
        }
      })
      .catch((err) => {
        if(err) {
          alert("Check your email or password!")
        };
      })
  }

  render() {
    return (
      <div>

          <div>

            <h2 style={{marginTop: '3em' }}>Log In</h2>
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Email"
              onChange={(event, newValue) =>
                this.setState({ email: newValue })
              }
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              style={style}
              disabled={this.state.email === "" || this.state.password === "" ? true : false}
              onClick={this.handleClick}
            />
          </div>

        {this.state.redirect ? <Redirect to='/petprofile'/>:null}
        <br />
      </div>
    );
  }
}
const style = {
  margin: 15
};

export default Login;
