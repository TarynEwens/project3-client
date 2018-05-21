import React, { Component } from 'react';
import './Games.css';
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import jwtDecoder from "jwt-decode";
import Cheese from "./images/cheese.png";

const PlayerCard = ({color, symbol})=> {
	const style = {
		backgroundColor: color,
		backgroundImage: "url(./img/" + symbol + ".png)"
	}
	return(
		<div style = {style} className="player-card">
		</div>
	)
}

class RPS extends Component {

	constructor(props) {
		super(props)
		this.symbols = ["pug" , "rat", "kitty"]
		this.state = {
      cheese: "",
      user: "",
      points: "",
      win: false
    }
	}

  componentDidMount = () => {
    this.fetchUser();
  };

  fetchUser = () => {
    // Fat arrow functions do not break the connection to this
    const user = jwtDecoder(window.localStorage.jwtToken);
    axios({
      url: `https://cheesepets-db.herokuapp.com/users/${user.sub}.json`,
      method: "get",
      headers: {
        authorization: `Bearer ${window.localStorage.jwtToken}`
      }
    }).then(res => this.setState({
      user: res.data,
      points: res.data.points
		}));
  };

	decideWinner = ()=> {
		const {computer, player} = this.state
		if(player == computer) {
			return "It's a draw. No cheese for you."
		}
		if((player==="pug" && computer==="kitty") ||
			(player==="rat" && computer==="pug") ||
			(player==="kitty" && computer==="rat")) {
      this.setState({win: true})
      this.sendReward();
			return `Woohoo! You won ${this.state.cheese} pieces of cheese!`
		}
		return "Aw bummer, you lost! Definitely no cheese for you."
	}

	runGame = () => {
    this.setState({win: false});
		let counter = 0
		let myInterval = setInterval(() => {
			counter++
			this.setState({
				player: this.symbols[Math.floor(Math.random()*3)],
				computer: this.symbols[Math.floor(Math.random()*3)],
				winner: ""
			})
			if(counter > 20) {
				clearInterval(myInterval)
        this.setState({cheese: Math.floor(Math.random() * 100) + 1 })
				this.setState({winner: this.decideWinner()})
			}
		},100)

	}

  sendReward = () => {
    if (this.state.win === true) {
      const user = jwtDecoder(window.localStorage.jwtToken);

      let url = `https://cheesepets-db.herokuapp.com/users/${
        user.sub
      }.json`;

      axios({
        url: url,
        method: "patch",
        headers: {
          authorization: `Bearer ${window.localStorage.jwtToken}`
        },
        data: {
          points: this.state.points + this.state.cheese
        }
      })
    }
  }

	render() {
		return (
      <div className="container game-container">
        <div className="pet-container">
    			<div className="App">
            <h2>Play "Pug, Rat, Kitty"</h2>
            <p>Its like "Rock, Paper, Scissors" ... except Pug scares Kitty, Rat scares Pug, and Kitty scares Rat!</p>
            <p>Each win will reward you with cheese - how much cheese will you win?</p>
            <p>Click the play button to begin!</p>
            <div className="card-container">
              <div className="card">
              <h3>Player</h3>
        				<PlayerCard

        					symbol={this.state.player}   />
              </div>
              <div className="card">
              <h3>Computer</h3>
      				<PlayerCard

      					symbol={this.state.computer}   />
              </div>
            </div>
      			<p>{this.state.winner}</p>
            <RaisedButton
              label="Play"
              type="submit"
              primary={true}
              onClick={this.runGame}
            />

            {this.state.win ? <img src={Cheese} name="Cheese" alt="Cheese" className="game-cheese"/>:null}

      		</div>
        </div>
      </div>
		);
	}
}

export default RPS;
