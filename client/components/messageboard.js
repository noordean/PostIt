import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UserActions from '../actions/user';
import MessageActions from '../actions/message';
import SideNav from './sidenav';
import Home from './home';
import ReactPaginate from 'react-paginate';

const LIMIT = 10;
class MessageBoard extends Component {
  componentDidMount() {
    if (localStorage.messageOffset) {
      this.props.getMessages(localStorage.groupID, JSON.parse(localStorage.user).token, localStorage.messageOffset, LIMIT); 
    } else {
      this.props.getMessages(localStorage.groupID, JSON.parse(localStorage.user).token, 0, LIMIT );
    }
    this.props.getGroupMembers(localStorage.groupID);
    this.props.getTotalMessages(localStorage.groupID);
  }
  componentWillUnmount() {
    this.props.groupsMessages.reqStatus = [];
    this.props.groupsMessages.reqError = null;
    this.props.groupsMessages.reqProcessed = false;
    this.props.groupsMessages.reqProcessing = false;
  }
  postMessageHandler(event) {
    event.preventDefault();
    const message = encodeURI(this.refs.msgInput.value);
    if (this.refs.msgInput.value.trim().length !== 0) {
      this.props.postGroupMessage(localStorage.groupID, message, JSON.parse(localStorage.user).token);
      this.refs.msgInput.value = '';
    }
  }
  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * LIMIT);
    localStorage.setItem('messageOffset', offset);
    this.props.getMessages(localStorage.groupID, JSON.parse(localStorage.user).token, offset, LIMIT)
  };
  render() {
    let pagination;
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
                        <p className="col-lg-10" className="msgTxt">{decodeURI(message.message)}</p>
                      </div>
                      <div className="col s2">
                        <small className="pull-right time"><i className="fa fa-clock-o"></i>{new Date(message.createdAt).toLocaleString()}</small>
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

    let members = [];
    if (this.props.groupMembers.reqProcessed) {
      if (this.props.groupMembers.reqStatus.message.length > 0) {
        members = this.props.groupMembers.reqStatus.message[0].groupmembers;
      }
    }

   if (this.props.totalMessages.reqStatus.message !== undefined) {
      pagination =       <ReactPaginate previousLabel={'Prev'}
                      nextLabel={'Next'}
                      breakLabel={'...'}
                      breakClassName={"break-me"}
                      pageCount={Math.ceil(this.props.totalMessages.reqStatus.message/LIMIT)}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick.bind(this)}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"} />
   }
    return (
      <div>
        <SideNav members={members} groupName={localStorage.groupName}/>
        <div className="row group-cards">
          <div className="col s3">
          </div>
          <div className="col s9">
           <div className="row" id="checkw">
              <form className="col s12" id="textareaForm">
                <div className="row">
                  <div className="input-field col s10">
                    <textarea id="textarea1" className="materialize-textarea white" ref="msgInput"></textarea>
                    <label htmlFor="textarea1">Message</label>
                  </div>
                  <div className="input-field col s2">
                    <a href="#" className="btn waves-effect waves-light col s12 red darken-4" onClick={this.postMessageHandler.bind(this)}>Post</a>
                  </div>
                </div>
              </form>
            </div>
            {messageBoard}
            {pagination}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groupsMessages: state.groupsMessages,
    groupMembers: state.groupMembers,
    postMessage: state.postMessage,
    totalMessages: state.totalMessages
  };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getMessages: MessageActions.getMessages,
    getGroupMembers: UserActions.getGroupMembers,
    postGroupMessage: MessageActions.postGroupMessage,
    getTotalMessages: MessageActions.getTotalMessages}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MessageBoard);