import React, {Component} from "react";
import {Link} from 'react-router';

export default class Header extends Component{
  render(){
    return (
          <nav>
            <div className="nav-wrapper red darken-4">
              <Link  id="navLogo" href="/" className="brand-logo left">PostIt</Link>
              <ul className="right">
                <li><Link to="/signup">Join PostIt</Link></li>
                <li><Link to="/signin">Log in</Link></li>
              </ul>
            </div>
          </nav>
    );
  }
}