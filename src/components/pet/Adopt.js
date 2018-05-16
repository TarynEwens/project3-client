import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Redirect } from 'react-router';
import axios from "axios";
import { Link } from "react-router-dom";
import jwtDecoder from "jwt-decode";
import CircularProgress from "material-ui/CircularProgress";
import pug from './images/pug/Pug03.png';
import panda from './images/panda/Panda_Singing.png';
import rat from './images/rat/Rat_03.png';
import kitty from './images/kitty/Kitty7.png';
import axolotl from './images/axolotl/Axolotl_02.png';
import css from './Pet.css'

const style = {
  margin: 15
};


class Adopt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      species: "",
      hunger: 30,
      happiness: 30,
      fun: 30,
      energy: 30,
      success: "",
      redirect: false
    }
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
        console.log(this.state.name, this.state.species);
        const user = jwtDecoder(this.props.token);

        let url = `https://cheesepets-api.herokuapp.com/pets.json`;

        axios({
          url: url,
          method: "post",
          headers: {
            authorization: `Bearer ${this.props.token}`
          },
          data: {
            name: this.state.name,
            species: this.state.species,
            hunger: this.state.hunger,
            happiness: this.state.happiness,
            fun: this.state.fun,
            energy: this.state.energy,
            user_id: user.sub
          }
        }).then(res => {
          if (res.status === 201) {
            this.setState({redirect: true})
          }
        });
      };

      _handleChange = event => {
        if (event.target.id === "name-field") {
          this.setState({
            name: event.target.value
          });
        }
        // if (event.target.id === "species-field") {
        //   this.setState({
        //     species: event.target.value
        //   });
        // }
      };

    _imageClick = event => {
     console.log(event.target.name);
     console.log("click");
       this.setState({
         species: event.target.name
       })
   }

      render() {
        if (!this.state.user) {
          return <CircularProgress size={60} thickness={7} />;
        }



        return (
          <div>
            <div>

              <form onSubmit={this._handleSubmit}>

                <div className="venuesHeader">
                  <h1>CheesePets Adoption Center</h1>
                </div>

                  <h4>Choose a Pet</h4>
                  <img src={pug} name="Puppy" alt="Puppy" onClick={this._imageClick} />
                  <img src={axolotl} name="Axolotl" alt="Axolotl" onClick={this._imageClick} />
                  <img src={panda} name="Busy Panda" alt="Busy Panda" onClick={this._imageClick} />
                  <img src={rat} name="Rat" alt="Rat" onClick={this._imageClick} />
                  <img src={kitty} name="Unicorn Kitty" alt="Unicorn Kitty" onClick={this._imageClick} />


                  <p><strong>Species:</strong> {this.state.species}</p>
                  <h4>Name your Pet</h4>
                <TextField
                  id="name-field"
                  hintText="name"
                  floatingLabelText="Name"
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


            {this.state.redirect ? <Redirect to='/petprofile'/>:null}
          </div>
        );
      }
    }

    export default Adopt;
