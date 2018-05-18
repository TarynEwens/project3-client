import React, { Component } from 'react';
import Background from './images/greenhills.jpg';
import Axolotl from './images/Axolotl_01.png';
import Pug from './images/Pug_05.png';
import Panda from './images/Panda_Groceries.png';
import Kitty from './images/Kitty2.png';
import Rat from './images/Rat_neutral.png';
import Logo from './images/cheesepets-logo-large.png';
import css from './Home.css';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Parallax } from 'react-scroll-parallax';
import { Link } from "react-router-dom";



class Home extends Component {
    render() {
        return (
          <div className="container-full">

            <div className="home-scene1">
              <div className="container-div">
                <img src={Logo} id="home-logo"/>
                <img src={Axolotl} className="home-pets"  id="home-axolotl"/>
                <img src={Pug} className="home-pets"  id="home-pug"/>

                <div className="home-text">
                  <div className="home-paragraphs">
                    <p>Once upon a time there was a land where only the best cheese was found... </p>
                    <p>For a long time the local “CheesePets” lived in harmony with the people who travelled across the seas to share in their cheese... </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="home-scene2">
              <div className="container-div">
                <div className="home-pet-container">
                  <img src={Panda} className="home-pets"  id="home-panda"/>


                  <div className="home-text">
                    <div className="home-paragraphs">
                      <p>Cheese was the most valuable posession for CheesePets, but the people who visited CheeseLand were greedy and wanted all the cheese for themselves. </p>
                      <p>They stole so much that the CheesePets had to hide their cheese. The people left the land, but the CheesePets had a new problem... they couldn’t remember where they hid the cheese! </p>
                    </div>
                    </div>
                    <img src={Kitty} className="home-pets"  id="home-kitty"/>
                </div>
              </div>
            </div>

            <div className="home-scene3">
            <div className="container-div">
            <div className="home-pet-container">

              <div className="home-text">
                <div className="home-paragraphs">
                  <p>Recently, a kind explorer happened to find an island that wasn’t on the map! On the island were CheesePets searching for their cheese. </p><p>An adoption center looks after baby CheesePets who are hungry, lonely and need your help!</p>
                </div>
              </div>
              <img src={Rat} className="home-pets" id="home-rat"/>
            </div>
            </div>

            </div>

            <div className="home-cto">
              <h1 className="call-to-action"><Link to ="/signup"><span>Sign up</span></Link> to visit CheeseLand and <span>adopt</span> a CheesePet! </h1>
              <p>Play games to find pieces of cheese and trade them for food and toys. </p><p>Look after your CheesePet and help restore CheeseLand to its former glory!</p>
            </div>


          </div>
        );
    }
}


export default Home;
