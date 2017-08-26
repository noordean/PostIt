import React, { Component } from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import GuestHeader from './guestHeader.jsx'
import GroupActions from '../actions/group';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseMsg: '',
      groupLimit: 6
    }
  }

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
    this.props.createGroup(groupName, description)
    .then(() => {
      if (this.props.group.reqError) {
        this.setState({
          responseMsg: 'Sorry, group could not be created'
        })
      } else if (this.props.group.responseMsg !== '') {
        this.setState({
          responseMsg: this.props.group.responseMsg
        })
      } else if (this.props.group.loading) {
        this.setState({
          responseMsg: 'Creating group...'
        })
      } else {
        responseMsg: 'Group created successfully'
        this.refs.createForm.reset();
        this.props.getGroups(JSON.parse(localStorage.user).id, this.state.groupLimit, 0);
        $('#modal1').modal('close');
      }
    });
  }

  render() {
    $('.modal').modal();
    $('.dropdown-button').dropdown();
    const errorMsg = <div className="center">{this.state.responseMsg}</div>;
    const userHeader =  (
          <div>
            <div id="modal1" className="modal">
              <div className="modal-content">
                <form className="group-form" ref="createForm">
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
          </div>);

    return (
      <div>
        {localStorage.user ? userHeader : <GuestHeader/>}
      </div>
    );
  }
}


Header.propTypes = {
  group: PropTypes.object,
	createGroup: PropTypes.func,
	getGroups: PropTypes.func
}
const mapStateToProps = (state) => {
  return {
    group: state.group
  };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ createGroup: GroupActions.createGroup, getGroups: GroupActions.getGroups}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Header);