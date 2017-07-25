import React, {Component} from "react";
import {Link} from 'react-router';
import { browserHistory } from 'react-router';

export default class Header extends Component{
  logoutHandler(event) {
    event.preventDefault();
    localStorage.removeItem('user');
    browserHistory.push('/');
  }
  getAuto() {
    alert(this.refs.autoInput.innerHTML);
  }
  render(){
    const userHeader = (
          <div>
            <div id="modal1" className="modal">
            <div className="modal-content">
              <form className="group-form">
                <div className="row">
                  <div className="input-field col s12">
                    <input id="password" type="text"/>
                    <label htmlFor="password">Group Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="textarea1" className="materialize-textarea white"></textarea>
                    <label htmlFor="password">Description</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                  <div id="chip" className="chips chips-autocomplete"></div>
                  <div id="getChips" ref="autoInput"></div>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <a href="#" className="btn waves-effect waves-light col s12 red darken-4" onClick={this.getAuto.bind(this)}>Create</a>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
          </div>
        </div>
        <ul id="dropdown1" className="dropdown-content">
          <li><a href="#!">Profile</a></li>
          <li><a href="#" onClick={this.logoutHandler.bind(this)}>Log out</a></li>
        </ul>
      <nav>
        <div className="nav-wrapper red darken-4">
          <Link id="navLogo" to={localStorage.user ? "/dashboard" : "/"} className="brand-logo left">PostIt</Link>
          <ul className="right">
            <li><a className="waves-effect waves-light btn modal-trigger red darken-4" href="#modal1">Create Group</a></li>
            <li><a className="dropdown-button" href="" data-activates="dropdown1">{localStorage.user ? JSON.parse(localStorage.user).user : ''}<i className="material-icons right">arrow_drop_down</i></a></li>
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
