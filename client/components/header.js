import React, {Component} from "react";
import {Link} from 'react-router';

export default class Header extends Component{
  render(){
    return (
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
                <Link to="/"><h4>PostIt</h4></Link>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="signup"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
              <li><Link to="login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
            </ul>
          </div>
        </nav>
    );
  }
}