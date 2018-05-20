import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Redirect } from 'react-router';
import axios from "axios";
import { Link } from "react-router-dom";
import jwtDecoder from "jwt-decode";
import CircularProgress from "material-ui/CircularProgress";
import css from './Pet.css'
import PetInteractions from './PetInteractions.js';

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

import Burger from './images/Items/Burger.png';
import HotDog from './images/Items/Hot_Dog.png';
import SoccerBall from './images/Items/Soccer_Ball.png';
import Cheese from './images/Items/Cheese.png'

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
      statement: "",
      points: "",
      hungerMessage: "",
      happinessMessage: "",
      funMessage: "",
      energyMessage:""
    }
  }

      componentDidMount = () => {
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
          email: res.data.email,
          points: res.data.points
          }))
          .then(async (res) => {
            await this.fetchPet();
          })
      };

      fetchPet = () => {
        // Fat arrow functions do not break the connection to this
        const user = jwtDecoder(this.props.token);
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

          if (this.state.hunger < 12) {
            this.setState({hungerMessage: "Starving"})
          } else if (this.state.hunger < 30) {
            this.setState({hungerMessage: "Hungry"})
          } else if (this.state.hunger < 40) {
            this.setState({hungerMessage: "Peckish"})
          } else if (this.state.hunger > 40) {
            this.setState({hungerMessage: "Full"})
          }

          if (this.state.happiness < 12) {
            this.setState({happinessMessage: "Miserable"})
          } else if (this.state.happiness < 30) {
            this.setState({happinessMessage: "Lonely"})
          } else if (this.state.happiness < 40) {
            this.setState({happinessMessage: "Content"})
          } else if (this.state.happiness > 40) {
            this.setState({happinessMessage: "Happy"})
          }

          if (this.state.fun < 12) {
            this.setState({funMessage: "Bored"})
          } else if (this.state.fun < 30) {
            this.setState({funMessage: "Chill"})
          } else if (this.state.fun < 40) {
            this.setState({funMessage: "Amused"})
          } else if (this.state.fun > 40) {
            this.setState({funMessage: "Excited"})
          }

          if (this.state.energy < 12) {
            this.setState({energyMessage: "Exhausted"})
          } else if (this.state.energy < 30) {
            this.setState({energyMessage: "Tired"})
          } else if (this.state.energy < 40) {
            this.setState({energyMessage: "Average"})
          } else if (this.state.energy > 40) {
            this.setState({energyMessage: "Hyper"})
          }

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
        //
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
      if (this.state.happiness < 48 && this.state.energy > 2) {
        this.setState({
          happiness: this.state.happiness + 4,
          energy: this.state.energy - 2,
          action: "happiness",
          statement: "\"Awww, I love hugs! I'm so happy!\""
        })

      } else {
        this.setState({
          action: "neutral",
          statement: "\"No more hugs thanks.\""
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
      })
      .then(res => {
        this.fetchPet() ;
      })
        .catch((err) => {
          if(err) {
            this.setState({
              action: "neutral",
              statement: "\"No more hugs thanks.\""
            })
          };
        })
    }



    handleNap = async () =>  {
      if (this.state.energy < 48 && this.state.hunger > 2) {
        this.setState({
          energy: this.state.energy + 4,
          hunger: this.state.hunger - 2,
          action: "nap",
          statement: "\"ZzzzZZZzzzZzzz\""
        })
      } else {
        this.setState({
          action: "neutral",
          statement: "\"No thanks, I'm not tired.\""
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
          hunger: this.state.hunger,
        }
      }).then(res => { this.fetchPet() })
        .catch((err) => {
          if(err) {
            this.setState({
              action: "neutral",
              statement: "\"No thanks, I'm not tired.\""
            })
          };
        })
    }

    handleFun = async () =>  {
      if (this.state.fun < 48 && this.state.hunger > 2 && this.state.points > 30) {
        this.setState({
          fun: this.state.fun + 4,
          hunger: this.state.hunger - 2,
          points: this.state.points - 30,
          action: "fun",
          statement: "\"This is so fun! I love balls!\""
        })

      } else {
        this.setState({
          action: "neutral",
          statement: "\"Ugh, no thanks. I'm not in the mood.\""
        })
      }
      await console.log(this.state.fun);
       await axios({
        url: `https://cheesepets-db.herokuapp.com/pets/${this.state.user.pets[0].id}.json`,
        method: "patch",
        headers: {
          authorization: `Bearer ${this.props.token}`
        },
        data: {
          fun: this.state.fun,
          hunger: this.state.hunger
        }
      })
      .then(res => {

          axios({
          url: `https://cheesepets-db.herokuapp.com/users/${this.state.user.id}.json`,
          method: "patch",
          headers: {
            authorization: `Bearer ${this.props.token}`
          },
          data: {
            points: this.state.points
          }
        })
      })
      .then(res => {
        this.fetchPet() ;
      })
        .catch((err) => {
          if(err) {
            this.setState({
              action: "neutral",
              statement: "\"Ugh, no thanks. I'm not in the mood.\""
            })
          };
        })
    }



    handleFood = async () =>  {
      if (this.state.hunger < 48 && this.state.energy > 2 && this.state.points > 20) {
        this.setState({
          energy: this.state.energy - 1,
          hunger: this.state.hunger + 4,
          points: this.state.points - 20,
          action: "hunger",
          statement: "\"Oh yum! I love this food!\""
        })
      } else {
        this.setState({
          action: "neutral",
          statement: "\"Yuck. I'm not hungry.\""
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
          hunger: this.state.hunger,
        }
      }).then(res => {

         axios({
          url: `https://cheesepets-db.herokuapp.com/users/${this.state.user.id}.json`,
          method: "patch",
          headers: {
            authorization: `Bearer ${this.props.token}`
          },
          data: {
            points: this.state.points
          }
        })
      }).then(res => { this.fetchPet() })
        .catch((err) => {
          if(err) {
            this.setState({
              action: "neutral",
              statement: "\"Yuck. I'm not hungry.\""
            })
          };
        })
    }

      render() {
        if (!this.state.user) {
          return <CircularProgress size={60} thickness={7} />;
        }

        return (
          <div className="container">
            <div className="pet-container">
              <h1>{this.state.name} the {this.state.species}</h1>
              <p><strong>Adopted by:</strong> {this.state.username} from {this.state.location}</p>
              <p><strong>Pieces of Cheese:</strong> {this.state.points}</p>

              <img src={this.state.image} name="Axolotl" alt="Axolotl" className="pet-profile" onClick={this._imageClick} />
              <p>{this.state.statement}</p>

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
              <div className="pet-stats">
                <div>
                  <p><strong>Hunger:</strong> {this.state.hungerMessage}</p>
                  <p id="stats">{this.state.hunger} / 50</p>
                </div>
                <div>
                  <p><strong>Happiness:</strong> {this.state.happinessMessage}</p>
                  <p id="stats">{this.state.happiness} / 50</p>
                </div>
                <div>
                  <p><strong>Fun:</strong> {this.state.funMessage}</p>
                  <p id="stats">{this.state.fun} / 50</p>
                </div>
                <div>
                  <p><strong>Energy:</strong> {this.state.energyMessage}</p>
                  <p id="stats">{this.state.energy} / 50</p>
                </div>
              </div>

              <div className="pet-container">
              <h2>Buy Items for Pet</h2>
                <div className="all-item-container">


                  <div className="item-container">
                    <img src={Burger} name="Buger" alt="Burger" className="item-profile" onClick={this._imageClick} />
                    <p><strong>Price:</strong> 20 pieces of cheese</p>
                    <RaisedButton
                      label="Buy for Pet"
                      type="nap"
                      primary={true}
                      style={style}
                      onClick={this.handleFood}
                    />
                  </div>

                  <div className="item-container">
                    <img src={HotDog} name="HotDog" alt="HotDog" className="item-profile" onClick={this._imageClick} />
                    <p><strong>Price:</strong> 20 pieces of cheese</p>
                    <RaisedButton
                      label="Buy for Pet"
                      type="nap"
                      primary={true}
                      style={style}
                      onClick={this.handleFood}
                    />
                  </div>

                  <div className="item-container">
                    <img src={SoccerBall} name="SoccerBall" alt="SoccerBall" className="item-profile" onClick={this._imageClick} />
                    <p><strong>Price:</strong> 30 pieces of cheese</p>
                    <RaisedButton
                      label="Buy for Pet"
                      type="nap"
                      primary={true}
                      style={style}
                      onClick={this.handleFun}
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    export default PetProfile;
