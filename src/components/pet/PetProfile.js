import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Redirect } from 'react-router';
import axios from "axios";
import { Link } from "react-router-dom";
import jwtDecoder from "jwt-decode";
import CircularProgress from "material-ui/CircularProgress";
import css from './Pet.css'

// Images
import AxolotlNeutral from './images/Axolotl/Axolotl_neutral.png';
import AxolotlHunger from './images/Axolotl/Axolotl_hunger.png';
import AxolotlFun from './images/Axolotl/Axolotl_fun.png';
import AxolotlHappiness from './images/Axolotl/Axolotl_happiness.png';
import AxolotlNap from './images/Axolotl/Axolotl_nap.png';

import PugNeutral from './images/Pug/Pug_neutral.png';
import PugHunger from './images/Pug/Pug_hunger.png';
import PugFun from './images/Pug/Pug_fun.png';
import PugHappiness from './images/Pug/Pug_happiness.png';
import PugNap from './images/Pug/Pug_nap.png';




const style = {
  margin: 15
};




class PetProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      username: "",
      location: "",
      bio: "",
      name: "",
      species: "",
      hunger: "",
      happiness: "",
      fun: "",
      energy: "",
      success: "",
      redirect: false,
      image: "",
      action: "neutral",
    }
  }

      componentDidMount = () => {
        console.log(this.props)
        this.fetchUser();
      };

      fetchUser = () => {
        // Fat arrow functions do not break the connection to this
        const user = jwtDecoder(this.props.token);

        axios({
          url: `https://cheesepets-db.herokuapp.com/users/${user.sub}.json`,
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
          }))
          .then(async (res) => {
            await this.fetchPet();
          })
      };

      fetchPet = () => {
        // Fat arrow functions do not break the connection to this
        const user = jwtDecoder(this.props.token);
        console.log(this.state.user);
        axios({
          url: `https://cheesepets-db.herokuapp.com/pets/${this.state.user.pets[0].id}.json`,
          method: "get",
          headers: {
            authorization: `Bearer ${this.props.token}`
          }
        }).then(res => this.setState({
          pet: res.data,
          name: res.data.name,
          species: res.data.species,
          hunger: res.data.hunger,
          happiness: res.data.happiness,
          fun: res.data.fun,
          energy: res.data.energy,
        }))
        .then(() => {
          if (this.state.location === null) {
            this.setState({ location: "CheeseLand"})
          }

          if (this.state.bio === null) {
            this.setState({ bio: "A cool person."})
          }
          this.imageState();
        });
      };

      imageState = () => {
        // Axolotyl
        if (this.state.species === "Axolotl" && this.state.action === "neutral") {
          this.setState({image: AxolotlNeutral})
        } else if (this.state.species === "Axolotl" && this.state.action === "hunger") {
          this.setState({image: AxolotlHunger})
        } else if (this.state.species === "Axolotl" && this.state.action === "fun") {
          this.setState({image: AxolotlFun})
        } else if (this.state.species === "Axolotl" && this.state.action === "happiness") {
          this.setState({image: AxolotlHappiness})
        } else if (this.state.species === "Axolotl" && this.state.action === "nap") {
          this.setState({image: AxolotlNap})
        }

        // Pug

        if (this.state.species === "Pug" && this.state.action === "neutral") {
          this.setState({image: PugNeutral})
        } else if (this.state.species === "Pug" && this.state.action === "hunger") {
          this.setState({image: PugHunger})
        } else if (this.state.species === "Pug" && this.state.action === "fun") {
          this.setState({image: PugFun})
        } else if (this.state.species === "Pug" && this.state.action === "happiness") {
          this.setState({image: PugHappiness})
        } else if (this.state.species === "Pug" && this.state.action === "nap") {
          this.setState({image: PugNap})
        }

      }

    handleHug = async () =>  {
      if (this.state.happiness < 50) {
        this.setState({
          happiness: this.state.happiness + 4,
          energy: this.state.energy - 2,
          action: "happiness"
        })

      } else {
        alert("No more hugs thanks!")
        this.setState({
          action: "neutral"
        })
      }
      await console.log(this.state.happiness);
      await axios({
        url: `https://cheesepets-db.herokuapp.com/pets/${this.state.user.pets[0].id}.json`,
        method: "patch",
        headers: {
          authorization: `Bearer ${this.props.token}`
        },
        data: {
          happiness: this.state.happiness,
          energy: this.state.energy
        }
      }).then(res => { this.fetchPet() })
        .catch((err) => {
          if(err) {
            alert("No more hugs thanks!")
          };
        })
    }

    handleNap = async () =>  {
      if (this.state.energy < 50) {
        this.setState({
          energy: this.state.energy + 4,
          hunger: this.state.hunger - 2,
          action: "nap"
        })
      } else {
        alert("No thanks, I'm not tired!")
        this.setState({
          action: "neutral"
        })
      }
      await console.log(this.state.energy);
      await axios({
        url: `https://cheesepets-db.herokuapp.com/pets/${this.state.user.pets[0].id}.json`,
        method: "patch",
        headers: {
          authorization: `Bearer ${this.props.token}`
        },
        data: {
          energy: this.state.energy,
          hunger: this.state.hunger
        }
      }).then(res => { this.fetchPet() })
        .catch((err) => {
          if(err) {
            alert("No thanks, I'm not tired!")
          };
        })
    }

      render() {
        if (!this.state.user) {
          return <CircularProgress size={60} thickness={7} />;
        }



        return (
          <div>
            <div>
              <h1>{this.state.name} the {this.state.species}</h1>
              <p>Adopted by: {this.state.username} from {this.state.location}</p>

              <img src={this.state.image} name="Axolotl" alt="Axolotl" className="pet-profile" onClick={this._imageClick} />

              <RaisedButton
                label="Hug Pet"
                type="hug"
                primary={true}
                style={style}
                onClick={this.handleHug}
              />
              <RaisedButton
                label="Nap Time"
                type="nap"
                primary={true}
                style={style}
                onClick={this.handleNap}
              />

              <p><strong>Hunger:</strong> {this.state.hunger} / 50</p>
              <p><strong>Happiness:</strong> {this.state.happiness} / 50</p>
              <p><strong>Fun:</strong> {this.state.fun} / 50</p>
              <p><strong>Energy:</strong> {this.state.energy} / 50</p>
            </div>
          </div>
        );
      }
    }

    export default PetProfile;
