import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UserActions from '../actions/user';

class SideNav extends Component {
  addMembersHandler(event) {
    event.preventDefault();
    const usernames = this.refs.autoInpt.value.split(' ');
    if (usernames[0].length === 0) {
      this.refs.errMsg.innerHTML = 'Please select members to add';
    } else {
      this.props.addGroupMembers(localStorage.groupID, usernames, JSON.parse(localStorage.user).token);
      this.refs.errMsg.innerHTML = '';
    }
  }
  render() {
    let errorMsg = <div className="center"></div>
		if (this.props.addMembers.reqProcessing) {
			errorMsg = <div className="center">Adding members...</div>;
		}
		if (this.props.addMembers.reqProcessed) {
			if (this.props.addMembers.reqStatus.message === 'Users successfully added') {
			  errorMsg = <div className="center">{this.props.addMembers.reqStatus.message}</div>;
			} else {
			  errorMsg = <div className="center">{this.props.addMembers.reqStatus.message}</div>;
			}
		}
		if (this.props.addMembers.reqError !== null) {
			errorMsg = <div className="center">An unexpected error occured. Kindly check your internet connection</div>;
		}
    const members = this.props.members.map((member, index) => {
      return <li key={index}><a href="#">{member}</a></li>
    });
    return (
        <div>
            <div id="modal2" className="modal">
            <div className="modal-content">
              <form className="group-form">
                <div className="center" ref="errMsg"></div>
                {errorMsg}
                  <div className="input-field row">
                    <div id="chip" className="chip chip-autocomplete"></div>
                  </div>
                  <div>
                    <a href="#" className="btn waves-effect waves-light col s12 red darken-4" onClick={this.addMembersHandler.bind(this)}>Add</a>
                  </div>
                  <div className="modal-footer">
                    <a href="" className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
                  </div>
                  <input type='hidden' ref="autoInpt" id="getMemberChips"/>
              </form>
          </div>
          </div>
          <ul id="slide-out" className="side-nav red darken-4 white-text">
            <li><h5 className="user-view">{this.props.groupName}</h5></li>
            <li><a className="waves-effect waves-light btn modal-trigger red darken-4" href="#modal2">Add new members</a></li>
            <li><i className="material-icons prefix">account_circle</i><a className='dropdown-button' href='#' data-activates='dropdown3'>Members<i className="material-icons right">arrow_drop_down</i></a></li>
          </ul>
          <ul id='dropdown3' className='dropdown-content'>
            {members}
          </ul>
            <a id="slideOut" href="" data-activates="slide-out" className="button-collapse"><i className="material-icons red-text">menu</i></a>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addMembers: state.addMembers
  };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ addGroupMembers: UserActions.addGroupMembers}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SideNav);