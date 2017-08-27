import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import UserActions from '../actions/user';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseMsg: '',
      groupMembers: []
    }
  }

  componentDidMount() {
    this.getMembersHandler();
  }

  getMembersHandler() {
    this.props.getGroupMembers(this.props.groupID)
    .then(() => {
      if (this.props.member.members.length > 0) {
        const newMembers = this.props.member.members.map((user) => {
          return user.username;
        });
        this.setState({
          groupMembers: newMembers
        });
      }
    })
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
    const newMembers = nextProps.member.members.map((user) => {
      return user.username;
    });
      this.setState({
        groupMembers: newMembers,
        responseMsg: nextProps.member.responseMsg
      });
    }
  }

  addMembersHandler(event) {
    event.preventDefault();
    const selectedMembers = this.refs.usersSelectedInput.value.split(' ');
    if (selectedMembers.length === 0) {
      this.refs.errMsg.innerHTML = "Kindly select members to add"
    } else {
      this.setState({
        responseMsg: 'Processing...'
      });
      this.props.addGroupMembers(this.props.groupID, selectedMembers, JSON.parse(localStorage.user).token)
      .then(() => {
        if (this.props.member.reqError) {
          this.setState({
            responseMsg: 'Sorry, members could not be added'
         })
        } else if (this.props.member.responseMsg !== '') {
          this.setState({
            responseMsg: this.props.member.responseMsg
          })
        } else {
          this.setState({
            responseMsg: 'Members added successfully'
          })
          this.getMembersHandler();
          $('#modal2').modal('close');
        }
      })
      this.refs.errMsg.innerHTML = '';
    }
  }

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
      members = this.state.groupMembers.map((member, index) => {
        return <li key={index}><a href="#">{member}</a></li>
      });
    }
    return (
        <div>
            <div id="modal2" className="modal">
            <div className="modal-content">
              <form className="group-form">
                <div className="center" ref="errMsg"></div>
                  <div className="center">{this.state.responseMsg}</div>
                  <div className="input-field row">
                    <div id="chips" className="chips chips-autocomplete"></div>
                  </div>
                  <div>
                    <a href="#" className="btn waves-effect waves-light col s12 red darken-4" onClick={this.addMembersHandler.bind(this)}>Add</a>
                  </div>
                  <input type='hidden' ref="autoInpt" id="getMemberChips"/>
              </form>
          </div>
          </div>

          <ul id="slide-out" className="side-nav fixed red darken-4 white-text">
            <li><h5 className="user-view">{this.props.groupName}</h5></li>
            <li><Link className="waves-effect waves-light btn modal-trigger red darken-4" to="/dashboard">Dashboard</Link></li>
            <li><a className="waves-effect waves-light btn modal-trigger red darken-4" href="#modal2" id="addMembers">Add members</a></li>
            <li><i className="material-icons prefix">account_circle</i><a className='dropdown-button' href="" data-activates='dropdown3'>Members<i className="material-icons right">arrow_drop_down</i></a></li>
            <li><input type="hidden" ref="getMembersInput" id="getMembers" value={this.state.groupMembers.join('-')}/></li>
            <li><input type="hidden" ref="usersSelectedInput" id="getChips"/></li>
          </ul>
          <ul id='dropdown3' className='dropdown-content'>
            {members}
          </ul>
            <a id="slideOut" href="" data-activates="slide-out" className="button-collapse"><i className="material-icons red-text">menu</i></a>
        </div>
    );
  }
}


SideNav.propTypes = {
  member: PropTypes.object,
	addGroupMembers: PropTypes.func,
	getGroupMembers: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    member: state.member
  };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addGroupMembers: UserActions.addGroupMembers,
    getGroupMembers: UserActions.getGroupMembers}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SideNav);