import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GuestHeader from './GuestHeader.jsx';
import CreateGroupModal from '../presentation/CreateGroupModal.jsx';
import GroupActions from '../../actions/GroupActions';

/**
  * @class GuestHeader
  */
export class Header extends Component {
/**
  * @constructor
  *
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
    this.openCreateGroupModal = this.openCreateGroupModal.bind(this);
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
        if (this.props.group.responseMsg.length === 0) {
          this.props.getGroups(this.state.groupLimit, 0);
          $('#createGroup').modal('close');
        }
      });
  }

  /**
  * description: clears the createGroup state inputs
  *
  * @return {void} void
  */
  clearCreateGroupState() {
    this.setState({
      groupName: '',
      groupDescription: ''
    });
  }
  /**
  * description: It opens the createGroup modal dynamically
  *
  * @param {event} event the event being executed
  *
  * @return {void} void
  */
  //eslint-disable-next-line
  openCreateGroupModal(event) {
    event.preventDefault();
    $('#createGroup').modal('open', {
      complete: this.clearCreateGroupState()
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
    const userHeader =
      (<div>
        <CreateGroupModal
          onChange={this.onChange}
          createGroup={this.createGroup}
          groupName={this.state.groupName}
          groupDescription={this.state.groupDescription}
        />
        <ul id="dropdown1" className="dropdown-content">
          <li><a href="" onClick={this.logoutHandler}>Log out</a></li>
        </ul>
        <nav>
          <div className="nav-wrapper red darken-4">
            <Link
              id="navLogo"
              to={localStorage.user ? '/dashboard' : '/'}
              className="brand-logo left"
            >
            PostIt
            </Link>
            <ul className="right">
              <li><a
                className="waves-effect waves-light btn modal-trigger red darken-4"
                href="##"
                onClick={this.openCreateGroupModal}
              >Create Group</a></li>
              <li>
                <a
                  className="dropdown-button"
                  href=""
                  data-activates="dropdown1"
                >{localStorage.user ? JSON.parse(localStorage.user).username : ''}
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
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
    responseMsg: PropTypes.string
  }).isRequired,
};

const mapStateToProps = state => ({
  group: state.group
});

const matchDispatchToProps = dispatch => bindActionCreators({
  createGroup: GroupActions.createGroup,
  getGroups: GroupActions.getGroups }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Header);
