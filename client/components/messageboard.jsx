import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import UserActions from '../actions/user';
import MessageActions from '../actions/message';
import SideNav from './sidenav.jsx';
import Home from './home.jsx';

/**
  * @class MessageBoard
  */
class MessageBoard extends Component {
/**
  * @constructor
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      responseMsg: '',
      msgStatus: 'Normal',
      messages: []
    };
    this.getMsgStatus = this.getMsgStatus.bind(this);
    this.postMessageHandler = this.postMessageHandler.bind(this);
  }

  /**
  * description: executes immediately after the component mounts
  * @return {void} void
  */
  componentDidMount() {
    this.getMessagesHandler();
  }

  /**
  * description: executes when the state changes
  * @param {object} nextProps the next state
  * @return {void} void
  */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        messages: nextProps.groupMessages.messages,
        responseMsg: nextProps.groupMessages.responseMsg
      });
    }
  }

  /**
  * description: gets all messages for a group
  * @return {void} void
  */
  getMessagesHandler() {
    this.props.getMessages(this.props.params.groupID, JSON.parse(localStorage.user).id)
      .then(() => {
        if (this.props.groupMessages.messages.length > 0) {
          this.setState({
            messages: this.props.groupMessages.messages,
          });
        } else if (this.props.groupMessages.error) {
          this.setState({
            responseMsg: 'Sorry, messages could not be fetched'
          });
        } else if (this.props.groupMessages.responseMsg !== '') {
          this.setState({
            responseMsg: this.props.groupMessages.responseMsg
          });
        }
        this.archiveMessageHandler();
      });
  }

  /**
  * description: gets the message status, either normal, urgent or critical
  * @param {event} event the event being executed
  * @return {void} void
  */
  getMsgStatus(event) {
    this.setState({
      msgStatus: event.target.value
    });
  }


  /**
  * description: archives all read messages
  * @return {void} void
  */
  archiveMessageHandler() {
    if (this.state.messages.length > 0) {
      const readMessageIds = this.state.messages.map((msgId) => {
        return msgId.id;
      });
      this.props.archiveReadMessages(this.props.params.groupID, JSON.parse(localStorage.user).id, readMessageIds);
    }
  }

  /**
  * description: posts message to a group
  * @param {event} event the event being executed
  * @return {void} void
  */
  postMessageHandler(event) {
    event.preventDefault();
    const msg = encodeURI(this.refs.msgInput.value);
    if (this.refs.msgInput.value.trim().length !== 0) {
      this.props.postGroupMessage(this.props.params.groupID, msg, this.state.msgStatus)
        .then(() => {
          this.refs.msgInput.value = '';
          if (this.props.groupMessages.responseMsg !== '') {
            this.setState({
              responseMsg: this.props.groupMessages.responseMsg
            });
          } else if (this.props.groupMessages.error) {
            this.setState({
              responseMsg: 'Sorry, message could not be posted'
            });
          } else {
            const postedMessage = this.props.groupMessages.messages[this.props.groupMessages.messages.length - 1];
            if (postedMessage.priority !== 'Normal') {
              this.sendMailNotification(this.props.member.members, decodeURI(msg));
            }
            if (postedMessage.priority === 'Critical') {
              const members = this.props.member.members.map((member) => {
                const membersObj = {};
                membersObj.to = member.phoneNumber;
                membersObj.from = 'PostIt App';
                membersObj.message = `Hi! ${postedMessage.postedby} just posted a message in ${this.props.params.groupName}: ${decodeURI(postedMessage.message)}`;
                return membersObj;
              });
              this.props.sendSmsForNotification(members);
            }
          }
        });
    }
  }

  /**
  * description: sends email notification to group members
  * @param {array} members the current group members
  * @param {string} message the resent message posted
  * @return {void} void
  */
  sendMailNotification(members, message) {
    const allMembers = members.map((member) => {
      return member.email;
    });
    const recepients = allMembers.filter((member) => {
      return member !== JSON.parse(localStorage.user).email;
    });
    const recepientsInStr = recepients.join(', ');
    const groupName = this.props.params.groupName;
    const poster = JSON.parse(localStorage.user).user;
    this.props.sendMailForNotification(recepientsInStr, groupName, message, poster);
  }

  /**
  * description: renders the component
  * @return {void} void
  */
  render() {
    if (!localStorage.user) {
      return <Home />;
    }

    let messageBoard;
    if (this.state.responseMsg !== '') {
      messageBoard = <div className="center">{this.state.responseMsg}</div>;
    } else if (this.props.groupMessages.loading) {
      messageBoard = <div className="center">Loading messages...</div>
    } else if (this.state.messages.length > 0) {
      messageBoard = this.state.messages.map((message) => {
        return (
          <div key={message.id}>
            <div className="row">
              <div className="col s10">
                <h6 className="media-heading">{message.postedby}</h6>
                <p className="col-lg-10" className="msgTxt">{decodeURI(message.message)}</p>
              </div>
              <div className="col s2">
                <div>
                  <div>
                    <small className="pull-right time">
                      <i className="fa fa-clock-o" />
                      {new Date(message.createdAt).toLocaleString()}
                    </small>
                  </div>
                  <div>
                    <small className="pull-right time red-text">
                      <i className="fa fa-clock-o" />
                      {message.priority}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        );
      });
    } else {
      messageBoard = <div className="center">There is no recent message in this group</div>
    }

    return (
      <div>
        <SideNav groupName={this.props.params.groupName} groupID={this.props.params.groupID}/>
        <div className="row group-cards">
          <div className="col s3" />
          <div className="col s9">
            <div id="msgarea">
              {messageBoard}
            </div>
            <div className="row" id="postArea">
              <form className="col s12" id="textareaForm">
                <div className="row">
                  <div className="input-field col s8">
                    <textarea id="textarea1" ref="msgInput" />
                    <label htmlFor="textarea1">Message</label>
                  </div>
                  <div className="col s2">
                    <p>
                      <input
                        name="group1"
                        type="radio"
                        id="test1"
                        value="Normal"
                        onClick={this.getMsgStatus}
                      />
                      <label htmlFor="test1">Normal</label>
                    </p>
                    <p>
                      <input
                        name="group1"
                        type="radio"
                        id="test2"
                        value="Urgent"
                        onClick={this.getMsgStatus}
                      />
                      <label htmlFor="test2">Urgent</label>
                    </p>
                    <p>
                      <input
                        name="group1"
                        type="radio"
                        id="test3"
                        value="Critical"
                        onClick={this.getMsgStatus}
                      />
                      <label htmlFor="test3">Critical</label>
                    </p>
                  </div>
                  <div className="input-field col s2">
                    <a
                      href="##"
                      className="btn waves-effect waves-light col s12 red darken-4"
                      onClick={this.postMessageHandler}
                    >Post</a>
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

MessageBoard.propTypes = {
  groupMessages: PropTypes.object.isRequired,
  getMessages: PropTypes.func.isRequired,
  postGroupMessage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    groupMessages: state.messages,
    member: state.member,
    archiveMessage: state.archiveMessage
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getMessages: MessageActions.getMessages,
    sendMailForNotification: UserActions.sendMailForNotification,
    sendSmsForNotification: UserActions.sendSmsForNotification,
    postGroupMessage: MessageActions.postGroupMessage,
    archiveReadMessages: MessageActions.archiveReadMessages }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(MessageBoard);
