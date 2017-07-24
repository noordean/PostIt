import React, {Component} from "react";
import {Link} from 'react-router';

export default class Header extends Component{
  render(){
    const userHeader = (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li><a href="#!">Profile</a></li>
          <li><a href="#!">Log out</a></li>
        </ul>
      <nav>
        <div className="nav-wrapper red darken-4">
          <Link id="navLogo" to="/" className="brand-logo left">PostIt</Link>
          <ul className="right">
            <li><Link to="">Create group</Link></li>
            <li><a className="dropdown-button" href="" data-activates="dropdown1">Noordean<i className="material-icons right">arrow_drop_down</i></a></li>
          </ul>
        </div>
      </nav>
    </div>
    );

    const guestHeader = (
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
    return (
      <div>
        {localStorage.user ? userHeader : guestHeader}
      </div>
    );
  }
}