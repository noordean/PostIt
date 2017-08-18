import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UserActions from '../actions/user';
import MessageActions from '../actions/message';
import SideNav from './sidenav';
import Home from './home';
import ReactPaginate from 'react-paginate';

class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgStatus: 'Normal'
    }
  }
  componentDidMount() {
    this.props.getGroupMembers(localStorage.groupID, JSON.parse(localStorage.user).token);
    this.props.getMessages(localStorage.groupID, JSON.parse(localStorage.user).token);
    }

  postMessageHandler(event) {
    event.preventDefault();
    const message = encodeURI(this.refs.msgInput.value);
    if (this.refs.msgInput.value.trim().length !== 0) {
      this.props.postGroupMessage(localStorage.groupID, message, this.state.msgStatus, JSON.parse(localStorage.user).token);
      this.refs.msgInput.value = '';
      window.location.reload();
    }
  }

  getMsgStatus(event) {
    this.setState({
      msgStatus: event.target.value
    });
  }

  render() {
    if (!localStorage.user) {
      return <Home/>
    }
    let groupMembers = [];
    let messageBoard;
      if (this.props.groupsMessages.reqProcessing) {
         messageBoard = <div className="center">Loading messages...</div>
      }
      if (this.props.groupsMessages.reqError !== null) {
         messageBoard = <div className="center">Could not load messages. Kindly check your internet connection</div>      
      }
      if (this.props.groupsMessages.reqProcessed) {
        if (this.props.groupsMessages.reqStatus.messages.length > 0) {
          messageBoard = this.props.groupsMessages.reqStatus.messages.map((message) => {
            return (<div  key={message.id}>
                    <div className="row">
                      <div className="col s10">
                        <h6 className="media-heading">{message.postedby}</h6>
                        <p className="col-lg-10" className="msgTxt">{decodeURI(message.message)}</p>
                      </div>
                      <div className="col s2">
                        <div>
                           <div><small className="pull-right time"><i className="fa fa-clock-o"></i>{new Date(message.createdAt).toLocaleString()}</small></div>
                           <div><small className="pull-right time red-text"><i className="fa fa-clock-o"></i>{message.priority}</small></div>
                       </div>
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
    
      if (this.props.groupMembers.reqProcessed) {
        if (this.props.groupMembers.reqStatus.message.length > 0) {
          this.props.groupMembers.reqStatus.message.forEach((member) => {
            groupMembers.push(member.username);
          });
        }
      }

    return (
      <div>
        <SideNav members={groupMembers} groupName={localStorage.groupName}/>
        <div className="row group-cards">
          <div className="col s3">
          </div>
          <div className="col s9">
            <div id="msgarea">
              {messageBoard}
            </div>
           <div className="row" id="postArea">
              <form className="col s12" id="textareaForm">
                <div className="row">
                  <div className="input-field col s8">
                    <textarea id="textarea1" ref="msgInput"></textarea>
                    <label htmlFor="textarea1">Message</label>
                  </div>
                  <div className="col s2">
                    <p>
                      <input name="group1" type="radio" id="test1" value="Normal" onClick={this.getMsgStatus.bind(this)}/>
                      <label htmlFor="test1">Normal</label>
                    </p>
                    <p>
                      <input name="group1" type="radio" id="test2" value="Urgent" onClick={this.getMsgStatus.bind(this)}/>
                      <label htmlFor="test2">Urgent</label>
                    </p>
                    <p>
                      <input name="group1" type="radio" id="test3" value="Critical" onClick={this.getMsgStatus.bind(this)}/>
                      <label htmlFor="test3">Critical</label>
                    </p>
                  </div>
                  <div className="input-field col s2">
                    <a href="#" className="btn waves-effect waves-light col s12 red darken-4" onClick={this.postMessageHandler.bind(this)}>Post</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      groupsMessages: state.groupMessages,
      groupMembers: state.groupMembers,
      postMessage: state.postMessage,
  };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getMessages: MessageActions.getMessages,
    getGroupMembers: UserActions.getGroupMembers,
    postGroupMessage: MessageActions.postGroupMessage}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MessageBoard);