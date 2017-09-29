import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserActions from '../../actions/UserActions';
import displayError from '../../utils/errorDisplay';

/**
  * @class SideNav
  */
export class SideNav extends Component {
/**
  * @constructor
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      responseMsg: '',
      groupMembers: []
    };
    this.addMembersHandler = this.addMembersHandler.bind(this);
    this.openAddMembers = this.openAddMembers.bind(this);
  }

  /**
  * description: executes immediately the component get mounted
  *
  * @return {void} void
  */
  componentDidMount() {
    this.getMembersHandler();
  }

  /**
  * description: executes when state is about to change
  *
  * @param {object} nextProps
  *
  * @return {void} void
  */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const newMembers = nextProps.member.members.map(user => user.username);
      this.setState({
        groupMembers: newMembers,
        responseMsg: nextProps.member.responseMsg
      });
    }
  }

  /**
  * description: get users ready for search into
  * autocomplete input
  *
  * @return {void} void
  */
  getAllSearchedUsers() {
    const users = {};
    this.props.getSearchedUsers(this.state.groupMembers.join('-'))
      .then(() => {
        const autoCompleteValues = {};
        this.props.searchedUsers.users.forEach((user) => {
          autoCompleteValues[user.username] = null;
          users[user.username] = user.id;
        });
        $('.chips-autocomplete').material_chip({
          placeholder: 'Add more members',
          secondaryPlaceholder: 'Enter a username',
          autocompleteOptions: {
            data: autoCompleteValues,
            limit: Infinity,
            minLength: 1,
          }
        });
      });
    const selectedUsers = [];
    $('.chips').on('chip.add', (e, chip) => {
      selectedUsers.push(users[chip.tag]);
      $('#getChips').val(selectedUsers.join(' '));
    });
    $('.chips').on('chip.delete', (e, chip) => {
      selectedUsers.splice(selectedUsers.indexOf(users[chip.tag]), 1);
      $('#getChips').val(selectedUsers.join(' '));
    });
  }
  /**
  * description: get members of the current group
  *
  * @return {void} void
  */
  getMembersHandler() {
    this.props.getGroupMembers(this.props.groupId)
      .then(() => {
        this.getAllSearchedUsers();
      });
  }

  /**
  * description: clears the addMembers state inputs
  *
  * @return {void} void
  */
  //eslint-disable-next-line
  clearAddMembersState() {
    $('input[placeholder="Enter a username"]').val('');
  }
  /**
  * description: It opens the addMembers modal dynamically
  *
  * @param {event} event the event being executed
  *
  * @return {void} void
  */
  //eslint-disable-next-line
  openAddMembers(event) {
    event.preventDefault();
    $('#addMembersModal').modal('open', {
      complete: this.clearAddMembersState()
    });
  }
  /**
  * description: adds members to group
  *
  * @param {object} event object
  *
  * @return {void} void
  */
  addMembersHandler(event) {
    event.preventDefault();
    const selectedMembers = $('#getChips').val().split(' ');
    if (selectedMembers[0] === '') {
      return displayError('Kindly select members to add');
    }
    this.props.addGroupMembers(this.props.groupId, selectedMembers,
      JSON.parse(localStorage.user).token)
      .then(() => {
        this.getMembersHandler();
        $('#addMembersModal').modal('close');
      });
  }

  /**
  * description: renders the component
  *
  * @return {void} void
  */
  render() {
    $('.modal').modal();
    $('.button-collapse').sideNav({
      menuWidth: 240,
      closeOnClick: false
    });
    $('.collapsible').collapsible();
    $('.dropdown-button').dropdown();

    let members;
    if (this.state.groupMembers.length > 0) {
      members = this.state.groupMembers.map(
        (member, index) => <li key={index}><a href="##">{member}</a></li>);
    }
    return (
      <div>
        <div id="addMembersModal" className="modal">
          <div className="modal-content">
            <form className="group-form">
              <div className="input-field row">
                <div id="chips" className="chips chips-autocomplete" />
              </div>
              <div>
                <a
                  href="##"
                  className="btn waves-effect waves-light col s12 red darken-4"
                  onClick={this.addMembersHandler}
                >Add</a>
              </div>
              <input type="hidden" id="getMemberChips" />
            </form>
          </div>
        </div>

        <ul id="slide-out" className="side-nav fixed red darken-4 white-text">
          <li><h5 className="user-view">{this.props.groupName}</h5></li>
          <li>
            <Link
              className="waves-effect waves-light btn modal-trigger red darken-4"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <a
              className="waves-effect waves-light btn modal-trigger red darken-4"
              href="##"
              onClick={this.openAddMembers}
              id="addMembers"
            >
              Add members
            </a>
          </li>
          <li>
            <div>
              <Link
                className="waves-effect waves-light btn archive red darken-4"
                to={`/archive-board/${this.props.groupId}`}
              >
                View Archived Messages
              </Link>
            </div>
          </li>
          <li>
            <i className="material-icons prefix">account_circle</i>
            <a
              className="dropdown-button"
              href="##"
              data-activates="dropdown3"
            >
              Members
              <i className="material-icons right">arrow_drop_down</i>
            </a>
          </li>
          <li><input
            type="hidden"
            id="getMembers"
            value={this.state.groupMembers.join('-')}
          /></li>
          <li><input type="hidden" id="getChips" /></li>
        </ul>
        <ul id="dropdown3" className="dropdown-content">
          {members}
        </ul>
        <a
          id="slideOut"
          href=""
          data-activates="slide-out"
          className="button-collapse"
        >
          <i className="material-icons red-text">menu</i></a>
      </div>
    );
  }
}


SideNav.propTypes = {
  groupId: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  addGroupMembers: PropTypes.func.isRequired,
  getGroupMembers: PropTypes.func.isRequired,
  getSearchedUsers: PropTypes.func.isRequired,
  member: PropTypes.shape({
    reqError: PropTypes.bool,
    responseMsg: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.object.isRequired)
  }).isRequired,
  searchedUsers: PropTypes.shape({
    users: PropTypes.arrayOf(PropTypes.object.isRequired)
  }).isRequired
};

const mapStateToProps = state => ({
  member: state.member,
  searchedUsers: state.searchedUser
});

const matchDispatchToProps = dispatch => bindActionCreators({
  addGroupMembers: UserActions.addGroupMembers,
  getGroupMembers: UserActions.getGroupMembers,
  getSearchedUsers: UserActions.getSearchedUsers }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(SideNav);
