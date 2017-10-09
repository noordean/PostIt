import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserActions from '../../actions/UserActions';
import MessageActions from '../../actions/MessageActions';
import SideNav from './Sidenav.jsx';
import Home from '../presentation/Home.jsx';
import MessageList from '../presentation/MessageList.jsx';
import PostMessageForm from '../presentation/PostMessageForm.jsx';

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
    this.openSeenMsgModal = this.openSeenMsgModal.bind(this);
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
    this.props.getMessages(this.props.params.groupId,
      JSON.parse(localStorage.user).id)
      .then(() => {
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
      this.props.archiveReadMessages(this.props.params.groupId,
        JSON.parse(localStorage.user).id, readMessageIds);
    }
  }

  /**
  * description: clears the createGroup state inputs
  *
  * @return {void} void
  */
  clearPostMessageState() {
    this.setState({
      messageInput: '',
      msgStatus: 'Normal'
    });
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
      this.props.postMessage(this.props.params.groupId,
        msg, this.state.msgStatus)
        .then(() => {
          this.clearPostMessageState();
          const postedMessage = this.props.groupMessages.messages[
            this.props.groupMessages.messages.length - 1];
          if (postedMessage.priority === 'Normal') {
            const recepients = this.props.member.members.filter(
              member => (
                member.username !== JSON.parse(localStorage.user).username));
            if (recepients.length > 0) {
              this.props.saveInAppNotification(recepients,
                this.props.params.groupName,
                postedMessage.message,
                postedMessage.postedby);
            }
          }
          if (postedMessage.priority !== 'Normal') {
            this.sendMailNotification(this.props.member.members,
              decodeURI(msg));
          }
          if (postedMessage.priority === 'Critical') {
            const members = this.props.member.members.map((member) => {
              const membersObj = {};
              membersObj.to = member.phoneNumber;
              membersObj.from = 'PostIt App';
              membersObj.message = `Hi! ${postedMessage.postedby} 
              just posted a message in ${this.props.params.groupName}: 
              ${decodeURI(postedMessage.message)}`;
              return membersObj;
            });
            this.props.smsNotification(members);
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
    const recepients = allMembers.filter(
      member => member !== JSON.parse(localStorage.user).email);
    const recepientsInStr = recepients.join(', ');
    const groupName = this.props.params.groupName;
    if (allMembers.length > 1) {
      this.props.mailNotification(
        recepientsInStr, groupName, message);
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
    this.props.getReadMessageUsers(messageId, this.props.params.groupId)
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
    if (this.props.groupMessages.loading) {
      messageBoard = (
        <div className="center loading-messages">Loading messages...</div>);
    } else if (this.state.messages.length > 0) {
      messageBoard = (
        <MessageList
          messages={this.state.messages}
          openSeenMsgModal={this.openSeenMsgModal}
        />
      );
    } else {
      messageBoard = (<div
        className="center"
      >There is no recent message in this group</div>);
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
          <SideNav
            groupName={this.props.params.groupName}
            groupId={this.props.params.groupId}
          />
          <div className="row group-cards">
            <div className="col s3" />
            <div className="col s9">
              <div id="msgarea">
                {messageBoard}
              </div>
              <PostMessageForm
                onChange={this.onChange}
                messageInput={this.state.messageInput}
                getMsgStatus={this.getMsgStatus}
                postMessageHandler={this.postMessageHandler}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MessageBoard.propTypes = {
  params: PropTypes.shape({
    groupId: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired
  }).isRequired,
  getMessages: PropTypes.func.isRequired,
  postMessage: PropTypes.func.isRequired,
  saveInAppNotification: PropTypes.func.isRequired,
  archiveReadMessages: PropTypes.func.isRequired,
  smsNotification: PropTypes.func.isRequired,
  mailNotification: PropTypes.func.isRequired,
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
  mailNotification: UserActions.mailNotification,
  smsNotification: UserActions.smsNotification,
  postMessage: MessageActions.postMessage,
  archiveReadMessages: MessageActions.archiveReadMessages,
  getReadMessageUsers: UserActions.getReadMessageUsers,
  saveInAppNotification: UserActions.saveInAppNotification }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(MessageBoard);
