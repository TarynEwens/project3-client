import React, {PureComponent as Component} from 'react';
import './Footer.css';


class Footer extends Component {


  footer = () => {
    return (
      <div>
        <footer>

          <div className="links">
            <a href="https://github.com/tarynelise/project3-client" target="_blank" rel="noopener noreferrer" className ="footerLink">About</a>
            <a href="https://taryn.codes" target="_blank" rel="noopener noreferrer" className ="footerLink">Contact</a>
          </div>

          <div className="copyright">
            <p className="lightFont">Copyright © 2018 CheesePets. All Rights Reserved.</p>
          </div>

          <div className="socials">
            <img height="20" width="20" src="https://unpkg.com/simple-icons@latest/icons/instagram.svg" alt="Instagram Logo"/>
            <img height="20" width="20" src="https://unpkg.com/simple-icons@latest/icons/facebook.svg" alt="Facebook Logo" />
            <img height="20" width="20" src="https://unpkg.com/simple-icons@latest/icons/twitter.svg" alt="Twitter Logo" />
          </div>
          <div>
          <p className="footer-small">'Project 3' for General Assembly Sydney's Web Development Immersive 26 by <a href="https://taryn.codes" target="_blank" rel="noopener noreferrer" className ="footerLink">Taryn Ewens</a>.</p>
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
