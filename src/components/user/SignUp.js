import React, { PureComponent as Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    password_confirmation: "",
    success: ""
  };

  handleClick = () => {
    let url = "http://cheesepets-api.herokuapp.com/users.json";

    let postData = {
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

    axios
      .post(url, postData, axiosConfig)
      .then(() => {
        this.setState({ success: "Success your account was created!" });
        axios({
          url: "http://cheesepets-api.herokuapp.com/user_token",
          method: "post",
          data: {
            auth: {
              email: this.state.email,
              password: this.state.password
            }
          }
        }).then(async (res) => {
          await localStorage.setItem("jwtToken", res.jwt);
          this.props.history.push("/EditProfile");
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
          <form>
            <label htmlFor="email">Email: </label>
            <br />
            <input
              name="email"
              id="email"
              type="email"
            />
            <br /><br />
            <label htmlFor="password">Password:</label>
            <br />
            <input
              name="password"
              id="password"
              type="password"
            />
            </form>
            <br />
            <button
              onClick={this.login}
            >
                Login
            </button>
        </div>
        <p>{this.state.success}</p>

      </div>
    );
  }
}
const style = {
  margin: 15
};

export default SignUp;
