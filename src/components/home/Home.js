import React, { Component } from 'react';
import Background from './images/greenhills.jpg';
import Axolotl from './images/Axolotl_05.png';
import Pug from './images/Pug_05.png';
import Logo from './images/cheesepets-logo-large.png';
import css from './Home.css';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Parallax } from 'react-scroll-parallax';



class Home extends Component {
    render() {
        return (
          <div className="container-full">
            <div className="home-scene1">
              <div className="container-div">
                <img src={Logo} id="home-logo"/>
                <img src={Pug}/>
              </div>
            </div>
            <div className="home-scene2">
            <div className="container-div">

              <img src={Axolotl}/>
            </div>
            </div>
            <div className="home-scene3">
            <div className="container-div">

            </div>
            </div>
          </div>
        );
    }
}


export default Home;
