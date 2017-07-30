import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getMessages } from '../actions/getMessagesAction';
import SideNav from './sidenav';
import Home from './home';

class MessageBoard extends Component {
  componentDidMount() {
    this.props.getMessages(localStorage.groupID, JSON.parse(localStorage.user).token);
  }
  componentWillUnmount() {
    this.props.groupsMessages.reqStatus = [];
    this.props.groupsMessages.reqError = null;
    this.props.groupsMessages.reqProcessed = false;
    this.props.groupsMessages.reqProcessing = false;
  }
  render() {
    if (!localStorage.user) {
      return <Home/>
    }
    let messageBoard;
      if (this.props.groupsMessages.reqProcessing) {
         messageBoard = <div className="center">Loading messages...</div>
      }
      if (this.props.groupsMessages.reqError !== null) {
         messageBoard = <div className="center">Could not load messages. Kindly check your internet connection</div>      
      }
      if (this.props.groupsMessages.reqProcessed) {
        if (this.props.groupsMessages.reqStatus.length > 0) {
          messageBoard = this.props.groupsMessages.reqStatus.map((message) => {
            return (<div  key={message.id}>
                    <div className="row">
                      <div className="col s10">
                        <h6 className="media-heading">{message.postedby}</h6>
                        <p className="col-lg-10">{message.message}</p>
                      </div>
                      <div className="col s2">
                        <small className="pull-right time"><i className="fa fa-clock-o"></i>{message.createdAt}</small>
                      </div>
                    </div>
                    <hr/>
                    </div>
                    );
          });
        } else {
          messageBoard = <div className="center">This group does not contain any message</div>
        }
      } 

    return (
      <div>
        <SideNav/>
        <div className="row group-cards">
          <div className="col s3">
          </div>
          <div className="col s9">
           <div className="row" id="checkw">
              <form className="col s12" id="textareaForm">
                <div className="row">
                  <div className="input-field col s10">
                    <textarea id="textarea1" className="materialize-textarea white"></textarea>
                    <label htmlFor="textarea1">Message</label>
                  </div>
                  <div className="input-field col s2">
                    <a href="#" className="btn waves-effect waves-light col s12 red darken-4">Post</a>
                  </div>
                </div>
              </form>
            </div>
            {messageBoard}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groupsMessages: state.groupsMessages
  };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getMessages: getMessages}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MessageBoard);