import React, {PureComponent as Component} from 'react';
import './Footer.css';
import { Link } from "react-router-dom";


class Footer extends Component {


  footer = () => {
    return (
      <div>
        <footer>

          <div className="links">
            <a href="https://github.com/tarynelise/project3-client" target="_blank" className ="footerLink">About</a>
            <a href="https://taryn.codes" target="_blank" className ="footerLink">Contact</a>
          </div>

          <div className="copyright">
            <p className="lightFont">Copyright © 2018 CheesePets. All Rights Reserved.</p>
          </div>

          <div className="socials">
            <img height="20" width="20" src="https://unpkg.com/simple-icons@latest/icons/instagram.svg" />
            <img height="20" width="20" src="https://unpkg.com/simple-icons@latest/icons/facebook.svg" />
            <img height="20" width="20" src="https://unpkg.com/simple-icons@latest/icons/twitter.svg" />
          </div>
          <div>
          <p className="footer-small">'Project 3' for General Assembly Sydney's Web Development Immersive 26 by <a href="https://taryn.codes" target="_blank" className ="footerLink">Taryn Ewens</a>.</p>
          </div>
        </footer>
      </div>
    )
  }





  render(){
    return (
      <div>
        {this.footer()}
      </div>
    )

  }

}

export default Footer;
