import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import UserActions from '../actions/user';
import MessageActions from '../actions/message';
import SideNav from './sidenav.jsx';
import Home from './home.jsx';

class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseMsg: '',
      msgStatus: 'Normal',
      messages: []
    }
  }

  getMessagesHandler() {
    this.props.getMessages(localStorage.groupID)
    .then(() => {
      if (this.props.groupMessages.messages.length > 0) {
        this.setState({
          messages: this.props.groupMessages.messages,
        });
      } else if (this.props.groupMessages.error) {
        this.setState({
          responseMsg: 'Sorry, messages could not be fetched'
        })
      } else if (this.props.groupMessages.responseMsg !== 0) {
        this.setState({
          responseMsg: this.props.groupMessages.responseMsg
        })
      }
    })
  }
 
  componentDidMount() {
    this.getMessagesHandler();
  }

  postMessageHandler(event) {
    event.preventDefault();
    const msg = encodeURI(this.refs.msgInput.value);
    if (this.refs.msgInput.value.trim().length !== 0) {
      this.props.postGroupMessage(localStorage.groupID, msg, this.state.msgStatus)
      .then(() => {
        this.refs.msgInput.value = '';
       if (this.props.groupMessages.responseMsg !== '') {
          this.setState({
            responseMsg: this.props.groupMessages.responseMsg
          })
        } else if (this.props.groupMessages.error) {
          this.setState({
            responseMsg: 'Sorry, message could not be posted'
          })
        } else {
          this.getMessagesHandler();
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        messages: nextProps.groupMessages.messages,
        responseMsg: nextProps.groupMessages.responseMsg
      });
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
    const msgError = <div className="center">{this.state.processing}</div>
    let messageBoard;
    if (this.props.groupMessages.loading) {
      messageBoard = <div className="center">Loading messages...</div>
    } else {
    if (this.state.messages.length > 0) {
      messageBoard = this.state.messages.map((message, index) => {
      return (
        <div  key={index}>
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

    return (
      <div>
        <SideNav groupName={localStorage.groupName}/>
        <div className="row group-cards">
          <div className="col s3">
          </div>
          <div className="col s9">
            {msgError}
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

MessageBoard.propTypes = {
  groupMessages: PropTypes.object,
	getMessages: PropTypes.func,
	postGroupMessage: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
      groupMessages: state.messages
  };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getMessages: MessageActions.getMessages,
    postGroupMessage: MessageActions.postGroupMessage}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MessageBoard);