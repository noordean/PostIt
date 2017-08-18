import React, {Component} from "react";
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import GroupActions from '../actions/group';

class Header extends Component{
  logoutHandler(event) {
    event.preventDefault();
    localStorage.removeItem('user');
    browserHistory.push('/');
    window.location.reload();
  }
  createGroup(event) {
    event.preventDefault();
    const groupName = this.refs.groupNameInput.value;
    const description = this.refs.descriptionInput.value;
    const token = JSON.parse(localStorage.user).token
    this.props.createGroup(groupName, description, token)
    .then(() => {
      if (this.props.group.groupStatus.message === 'Group successfully created') {
        window.location.reload();
      }
    });
  }
  render() {
    let errorMsg = <div className="center"></div>
		if (this.props.group.groupProcessing) {
			errorMsg = <div className="center">Creating group...</div>;
		}
		if (this.props.group.groupProcessed) {
			if (this.props.group.groupStatus.message === 'Group successfully created') {
			  errorMsg = <div className="center">{this.props.group.groupStatus.message}</div>;
			} else {
			  errorMsg = <div className="center">{this.props.group.groupStatus.message}</div>;
			}
		}
		if (this.props.group.groupError !== null) {
			errorMsg = <div className="center">An unexpected error occured. Kindly check your internet connection</div>;
		}
    const userHeader = (
          <div>
            <div id="modal1" className="modal">
            <div className="modal-content">
              <form className="group-form">
                <div className="row">
                  {errorMsg}
                  <div className="input-field col s12">
                    <input type="text" ref="groupNameInput"/>
                    <label htmlFor="password">Group Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="textarea1" className="materialize-textarea white" ref="descriptionInput"></textarea>
                    <label htmlFor="password">Description</label>
                  </div>
                </div>
              <div className="row">
                <div className="input-field col s12">
                  <a href="#" className="btn waves-effect waves-light col s12 red darken-4" onClick={this.createGroup.bind(this)}>Create</a>
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
          <li><a href="" onClick={this.logoutHandler.bind(this)}>Log out</a></li>
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


const mapStateToProps = (state) => {
  return {
    group: state.group
  };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ createGroup: GroupActions.createGroup}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Header);