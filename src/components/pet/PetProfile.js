import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Redirect } from 'react-router';
import axios from "axios";
import { Link } from "react-router-dom";
import jwtDecoder from "jwt-decode";
import CircularProgress from "material-ui/CircularProgress";
import AxolotlNeutral from './images/Axolotl/Axolotl_neutral.png';
import AxolotlHunger from './images/Axolotl/Axolotl_hunger.png';
import AxolotlFun from './images/Axolotl/Axolotl_fun.png';
import AxolotlHappiness from './images/Axolotl/Axolotl_happiness.png';
import AxolotlNap from './images/Axolotl/Axolotl_nap.png';
import css from './Pet.css'

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
      hunger: 30,
      happiness: 30,
      fun: 30,
      energy: 30,
      success: "",
      redirect: false,
      image: "",
      action: ""
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
        if (this.state.species === "Axolotl" && this.state.action === "") {
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

      }


      _handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.name, this.state.species);
        const user = jwtDecoder(this.props.token);

        let url = `https://cheesepets-db.herokuapp.com/pets.json`;

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

    handleHug = async () =>  {
      if (this.state.happiness < 30) {
        this.setState({happiness: this.state.happiness + 2})
      } else {
        alert("No more hugs thanks!")
      }
      await console.log(this.state.happiness);
      await axios({
        url: `https://cheesepets-db.herokuapp.com/pets/${this.state.user.pets[0].id}.json`,
        method: "patch",
        headers: {
          authorization: `Bearer ${this.props.token}`
        },
        data: {
          happiness: this.state.happiness
        }
      }).then(res => { this.fetchPet() })
        .catch((err) => {
          if(err) {
            alert("No more hugs thanks!")
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

              <p><strong>Hunger:</strong> {this.state.hunger}</p>
              <p><strong>Happiness:</strong> {this.state.happiness}</p>
              <p><strong>Fun:</strong> {this.state.fun}</p>
              <p><strong>Energy:</strong> {this.state.energy}</p>
            </div>
          </div>
        );
      }
    }

    export default PetProfile;
