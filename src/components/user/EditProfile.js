import React, { PureComponent as Component } from "react";

import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import jwtDecoder from "jwt-decode";
import CircularProgress from "material-ui/CircularProgress";
import { Link } from "react-router-dom";

const style = {
  margin: 15
};


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: "",
      location: "",
      bio: "",
      email: "",
      password: "",
      password_confirmation: "",
      success: ""
    };
  }

  componentDidMount = () => {
    console.log(this.props)
    this.fetchUser();
  };

  fetchUser = () => {
    // Fat arrow functions do not break the connection to this
    const user = jwtDecoder(this.props.token);
    console.log(user);
    axios({
      url: `https://cheesepets-api.herokuapp.com/users/${user.sub}.json`,
      method: "get",
      headers: {
        authorization: `Bearer ${this.props.token}`
      }
    }).then(res => this.setState({
      user: res.data,
      username: res.data.username,
      location: res.data.location,
      bio: res.data.bio,
      email: res.data.email
      }));
  };

  _handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.username);
    const user = jwtDecoder(this.props.token);

    let url = `https://cheesepets-api.herokuapp.com/users/${
      user.sub
    }.json`;
    console.log(url);

    axios({
      url: url,
      method: "patch",
      headers: {
        authorization: `Bearer ${this.props.token}`
      },
      data: {
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        username: this.state.username,
        location: this.state.location,
        bio: this.state.bio,
      }
    }).then(res =>
      this.setState({ success: "Success your account was updated!" })
    );
  };

  _handleChange = event => {
    if (event.target.id === "username-field") {
      this.setState({
        username: event.target.value
      });
    }
    if (event.target.id === "location-field") {
      this.setState({
        location: event.target.value
      });
    }
    if (event.target.id === "bio-field") {
      this.setState({
        bio: event.target.value
      });
    }
    if (event.target.id === "password-field") {
      this.setState({
        password: event.target.value
      });
    }
    if (event.target.id === "password-confirmation-field") {
      this.setState({
        password_confirmation: event.target.value
      });
    }
  };

  render() {
    if (!this.state.user) {
      return <CircularProgress size={60} thickness={7} />;
    }



    return (
      <div>
        <div>

          <form onSubmit={this._handleSubmit}>

            <div className="venuesHeader">
              <h1>Edit Profile</h1>
            </div>

              <h4>Update Profile</h4>

            <TextField
              id="username-field"
              hintText="Username"
              floatingLabelText="Username"
              defaultValue={this.state.user.username}
              onChange={this._handleChange}
            />
            <br />
            <TextField
              id="location-field"
              hintText="Location"
              floatingLabelText="Location"
              defaultValue={this.state.user.location}
              onChange={this._handleChange}
            />
            <br />
            <TextField
              id="bio-field"
              hintText="Biography"
              floatingLabelText="Biography"
              defaultValue={this.state.user.bio}
              onChange={this._handleChange}
            />

            <br /><br /><br />
            <h5>Confirm Password</h5>
            <TextField
              id="password-field"
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={this._handleChange}
            />
            <br />
            <TextField
              id="password-confirmation-field"
              type="password"
              hintText="Password confirmation"
              floatingLabelText="Password Confirmation"
              onChange={this._handleChange}
            />
            <br />

            <br />
            <RaisedButton
              label="Submit"
              type="submit"
              primary={true}
              style={style}
            />
          </form>
        </div>

        <p>{this.state.success}</p>

      </div>
    );
  }
}

export default EditProfile;
