import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserActions from '../actions/user';
import MessageActions from '../actions/message';
import SideNav from './Sidenav.jsx';
import Home from './Home.jsx';

/**
  * @class MessageBoard
  */
export class MessageBoard extends Component {
/**
  * @constructor
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      responseMsg: '',
      msgStatus: 'Normal',
      messages: [],
      readMessageUsers: [],
      messageInput: ''
    };
    this.getMsgStatus = this.getMsgStatus.bind(this);
    this.postMessageHandler = this.postMessageHandler.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
  * description: executes immediately after the component mounts
  *
  * @return {void} void
  */
  componentDidMount() {
    this.getMessagesHandler();
  }

  /**
  * description: executes when the state changes
  *
  * @param {object} nextProps the next state
  *
  * @return {void} void
  */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        messages: nextProps.groupMessages.messages,
        responseMsg: nextProps.groupMessages.responseMsg,
        readMessageUsers: nextProps.readMessages.users
      });
    }
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
  * description: gets all messages for a group
  *
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
  *
  * @param {event} event the event being executed
  *
  * @return {void} void
  */
  getMsgStatus(event) {
    this.setState({
      msgStatus: event.target.value
    });
  }


  /**
  * description: archives all read messages
  *
  * @return {void} void
  */
  archiveMessageHandler() {
    if (this.state.messages.length > 0) {
      const readMessageIds = this.state.messages.map(msgId => msgId.id);
      this.props.archiveReadMessages(this.props.params.groupID,
        JSON.parse(localStorage.user).id, readMessageIds);
    }
  }


  /**
  * description: posts message to a group
  *
  * @param {event} event the event being executed
  *
  * @return {void} void
  */
  postMessageHandler(event) {
    event.preventDefault();
    const msg = encodeURI(this.state.messageInput);
    if (msg.length !== 0) {
      this.props.postGroupMessage(this.props.params.groupID, msg, this.state.msgStatus)
        .then(() => {
          this.setState({
            messageInput: ''
          });
          if (this.props.groupMessages.responseMsg !== '') {
            this.setState({
              responseMsg: this.props.groupMessages.responseMsg
            });
          } else if (this.props.groupMessages.error) {
            this.setState({
              responseMsg: 'Sorry, message could not be posted'
            });
          } else {
            const postedMessage = this.props.groupMessages.messages[
              this.props.groupMessages.messages.length - 1];
            if (postedMessage.priority === 'Normal') {
              const recepients = this.props.member.members.filter(
                member => (member.username !== JSON.parse(localStorage.user).username));
              if (recepients.length > 0) {
                this.props.saveInAppNotification(recepients,
                  this.props.params.groupName, postedMessage.message, postedMessage.postedby);
              }
            }
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
  *
  * @param {array} members the current group members
  * @param {string} message the resent message posted
  *
  * @return {void} void
  */
  sendMailNotification(members, message) {
    const allMembers = members.map(member => member.email);
    const recepients = allMembers.filter(member => member !== JSON.parse(localStorage.user).email);
    const recepientsInStr = recepients.join(', ');
    const groupName = this.props.params.groupName;
    const poster = JSON.parse(localStorage.user).username;
    if (allMembers.length > 1) {
      this.props.sendMailForNotification(recepientsInStr, groupName, message, poster);
    }
  }

  /**
  * description: posts message to a group
  *
  * @param {integer} messageId the id of the message to get users for
  * @param {event} event the event being executed
  *
  * @return {void} void
  */
  openSeenMsgModal(messageId, event) {
    event.preventDefault();
    this.props.getReadMessageUsers(messageId, this.props.params.groupID)
      .then(() => {
        this.setState({
          readMessageUsers: this.props.readMessages.users
        });
        $('#seenMsgModal').modal('open');
      });
  }

  /**
  * description: renders the component
  *
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
      messageBoard = <div className="center">Loading messages...</div>;
    } else if (this.state.messages.length > 0) {
      messageBoard = this.state.messages.map(message => (
        <div key={message.id}>
          <div className="row">
            <div className="col s10">
              <h6 className="media-heading">{message.postedby}</h6>
              <p className="col-lg-10 msgTxt">{decodeURI(message.message)}</p>
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
                  <small className="seen">
                    <a
                      href="##"
                      onClick={this.openSeenMsgModal.bind(this, message.id)}
                    >seen by:</a>
                  </small>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      ));
    } else {
      messageBoard = <div className="center">There is no recent message in this group</div>;
    }

    let readMessageUsers = ['none'];
    if (this.state.readMessageUsers.length !== 0) {
      readMessageUsers = this.state.readMessageUsers.map(user => user.username);
    }
    return (
      <div>
        <div id="seenMsgModal" className="modal">
          <div className="modal-content">
            {readMessageUsers.join(', ')}
          </div>
        </div>
        <div>
          <SideNav groupName={this.props.params.groupName} groupID={this.props.params.groupID} />
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
                      <textarea
                        id="textarea1"
                        value={this.state.messageInput}
                        name="messageInput"
                        onChange={this.onChange}
                      />
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
      </div>
    );
  }
}

MessageBoard.propTypes = {
  params: PropTypes.shape({
    groupID: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired
  }).isRequired,
  getMessages: PropTypes.func.isRequired,
  postGroupMessage: PropTypes.func.isRequired,
  saveInAppNotification: PropTypes.func.isRequired,
  archiveReadMessages: PropTypes.func.isRequired,
  sendSmsForNotification: PropTypes.func.isRequired,
  sendMailForNotification: PropTypes.func.isRequired,
  getReadMessageUsers: PropTypes.func.isRequired,
  groupMessages: PropTypes.shape({
    responseMsg: PropTypes.string,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    messages: PropTypes.arrayOf(PropTypes.object.isRequired),
  }).isRequired,
  readMessages: PropTypes.shape({
    error: PropTypes.bool,
    loading: PropTypes.bool,
    users: PropTypes.arrayOf(PropTypes.object.isRequired),
  }).isRequired,
  member: PropTypes.shape({
    reqError: PropTypes.bool,
    responseMsg: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.object.isRequired),
  }).isRequired
};

const mapStateToProps = state => ({
  groupMessages: state.messages,
  member: state.member,
  archiveMessage: state.archiveMessage,
  readMessages: state.readMessages,
  appNotification: state.appNotification
});

const matchDispatchToProps = dispatch => bindActionCreators({
  getMessages: MessageActions.getMessages,
  sendMailForNotification: UserActions.sendMailForNotification,
  sendSmsForNotification: UserActions.sendSmsForNotification,
  postGroupMessage: MessageActions.postGroupMessage,
  archiveReadMessages: MessageActions.archiveReadMessages,
  getReadMessageUsers: UserActions.getReadMessageUsers,
  saveInAppNotification: UserActions.saveInAppNotification }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(MessageBoard);
