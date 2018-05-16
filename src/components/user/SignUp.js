import React, { PureComponent as Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    success: ""
  };

  handleClick = () => {
    let url = "https://cheesepets-db.herokuapp.com/users.json";
    console.log("clicked");
    console.log(this.state.username, this.state.email, this.state.password, this.state.password_confirmation);
    let postData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };
    console.log("requesting");
    axios
      .post(url, postData, axiosConfig)
      .then(() => {
        this.setState({ success: "Success your account was created!" });
        axios({
          url: "https://cheesepets-db.herokuapp.com/user_token",
          method: "post",
          data: {
            auth: {
              email: this.state.email,
              password: this.state.password
            }
          }
        }).then(async (res) => {
          await localStorage.setItem("jwtToken", res.jwt);
          this.props.history.push("/adopt");
        });
      })
      .catch(err => {
        if(err.message.includes("422")) {
          alert("Password not matched!")
        };
      });
  };

  render() {
    return (
      <div>
        <div>
          <h2 style={{marginTop: '3em' }}>Sign Up</h2>
          <TextField
            hintText="Create a Username"
            floatingLabelText="Username"
            onChange={(event, newValue) => this.setState({ username: newValue })}
          />
          <br />
          <TextField
            hintText="Enter your Email"
            floatingLabelText="Email"
            onChange={(event, newValue) => this.setState({ email: newValue })}
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
          <TextField
            type="password"
            hintText="Password confirmation"
            floatingLabelText="Password Confirmation"
            onChange={(event, newValue) =>
              this.setState({ password_confirmation: newValue })
            }
          />
          <br />
          <RaisedButton
            label="Submit"
            primary={true}
            style={style}
            disabled={this.state.email !== "" && this.state.password !== "" && this.state.password_confirmation !== "" ? false : true}
            onClick={this.handleClick}
          />
        </div>
        <p>Must be over 18 years of age.</p>
        <p>By signing up you agree to our <a href="#">Terms & Conditions</a></p>.
        <p>{this.state.success}</p>

      </div>
    );
  }
}
const style = {
  margin: 15
};

export default SignUp;
