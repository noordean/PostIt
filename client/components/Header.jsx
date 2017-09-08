import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GuestHeader from './GuestHeader.jsx';
import GroupActions from '../actions/group';

/**
  * @class GuestHeader
  */
export class Header extends Component {
/**
  * @constructor
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupDescription: '',
      responseMsg: '',
      groupLimit: 6
    };
    this.createGroup = this.createGroup.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
  * description: controls inputs state
  *
  * @param {object} element the current element
  *
  * @return {void} void
  */
  onChange(element) {
    this.setState({
      [element.target.name]: element.target.value,
    });
  }

  /**
  * description: creates new group
  *
  * @param {object} event the event being executed
  *
  * @return {void} void
  */
  createGroup(event) {
    event.preventDefault();
    this.props.createGroup(this.state.groupName, this.state.groupDescription)
      .then(() => {
        if (this.props.group.error) {
          this.setState({
            responseMsg: 'Sorry, group could not be created'
          });
        } else if (this.props.group.responseMsg !== '') {
          this.setState({
            responseMsg: this.props.group.responseMsg
          });
        } else if (this.props.group.loading) {
          this.setState({
            responseMsg: 'Creating group...'
          });
        } else {
          this.setState({
            responseMsg: 'Group created successfully',
            groupName: '',
            groupDescription: ''
          });
          this.props.getGroups(this.state.groupLimit, 0);
          $('#modal1').modal('close');
        }
      });
  }

  /**
  * description: logs a user out
  *
  * @param {object} event the event being executed
  *
  * @return {void} void
  */
  //eslint-disable-next-line
  logoutHandler(event) {
    event.preventDefault();
    localStorage.removeItem('user');
    browserHistory.push('/');
    window.location.reload();
  }

  /**
  * description: render the google button
  *
  * @return {void} void
  */
  render() {
    $('.modal').modal();
    $('.dropdown-button').dropdown();
    const errorMsg = <div className="center">{this.state.responseMsg}</div>;
    const userHeader =
      (<div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <form className="group-form" id="createForm">
              <div className="row">
                {errorMsg}
                <div className="input-field col s12">
                  <input
                    type="text"
                    name="groupName"
                    onChange={this.onChange}
                    value={this.state.groupName}
                  />
                  <label htmlFor="password">Group Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="textarea1"
                    name="groupDescription"
                    className="materialize-textarea white"
                    onChange={this.onChange}
                    value={this.state.groupDescription}
                  />
                  <label htmlFor="password">Description</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <a
                    href="##"
                    className="btn waves-effect waves-light col s12 red darken-4"
                    onClick={this.createGroup}
                  >Create</a>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-action modal-close waves-effect waves-green btn-flat"
            >Cancel</a>
          </div>
        </div>
        <ul id="dropdown1" className="dropdown-content">
          <li><a href="#!">Profile</a></li>
          <li><a href="" onClick={this.logoutHandler}>Log out</a></li>
        </ul>
        <nav>
          <div className="nav-wrapper red darken-4">
            <Link id="navLogo" to={localStorage.user ? '/dashboard' : '/'} className="brand-logo left">PostIt</Link>
            <ul className="right">
              <li><a
                className="waves-effect waves-light btn modal-trigger red darken-4"
                href="#modal1"
              >Create Group</a></li>
              <li><a className="dropdown-button" href="" data-activates="dropdown1">{localStorage.user ? JSON.parse(localStorage.user).username : ''}<i className="material-icons right">arrow_drop_down</i></a></li>
            </ul>
          </div>
        </nav>
      </div>);

    return (
      <div>
        {localStorage.user ? userHeader : <GuestHeader />}
      </div>
    );
  }
}

Header.propTypes = {
  createGroup: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.shape({
    error: PropTypes.bool,
    responseMsg: PropTypes.string,
    loading: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.object.isRequired),
    pageCount: PropTypes.number
  }).isRequired,
};

const mapStateToProps = state => ({
  group: state.group
});

const matchDispatchToProps = dispatch => bindActionCreators({
  createGroup: GroupActions.createGroup, getGroups: GroupActions.getGroups }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Header);
