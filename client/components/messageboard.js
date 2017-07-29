import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getMessages } from '../actions/getMessagesAction';

class MessageBoard extends Component {
  componentDidMount() {
    this.props.getMessages(this.props.params.groupID, JSON.parse(localStorage.user).token);
  }

  render() {
    let messageBoard;
    if (!localStorage.user) {
      messageBoard = <Home/>;
    } else {
      if (this.props.groupsMessages.reqProcessing) {
         messageBoard = <div className="center">Loading messages...</div>
      }
      if (this.props.groupsMessages.reqError !== null) {
         messageBoard = <div className="center">Could not load messages. Kindly check your internet connection</div>      
      }
      if (this.props.groupsMessages.reqProcessed) {
        if (this.props.groupsMessages.reqStatus.length > 0) {
          messageBoard = this.props.groupsMessages.reqStatus.map((message) => {
            return (<div className="row">
                      <div className="col s10">
                        <h6 className="media-heading">{message.postedby}</h6>
                        <p className="col-lg-10">{message.message}</p>
                      </div>
                      <div className="col s2">
                        <small className="pull-right time"><i className="fa fa-clock-o"></i>{message.createdAt}</small>
                      </div>
                      <hr/>
                    </div>
                    );
          });
        } else {
          messageBoard = <div className="center">This group does not contain any message</div>
        }
      } 
    }

    return (
      <div>
        <ul id="slide-out" className="side-nav red darken-4 white-text">
          <li><div className="user-view">Group Name</div></li>
          <li><i className="material-icons prefix">account_circle</i><a className='dropdown-button' href='#' data-activates='dropdown3'>Members<i className="material-icons right">arrow_drop_down</i></a></li>
        </ul>
        <ul id='dropdown3' className='dropdown-content'>
          <li><a href="#!">evidence</a></li>
          <li><a href="#!">Babatunde</a></li>
          <li><a href="#!">supermike</a></li>
          <li><a href="#!">Pythagoras</a></li>
          <li><a href="#!">Jchinonso</a></li>
        </ul>

        <div className="row group-cards">
          <div className="col s3">
            <a id="slideOut" href="" data-activates="slide-out" className="button-collapse"><i className="material-icons red-text">menu</i></a>
          </div>
          <div className="col s9">
            {messageBoard}
          </div>
          <div className="row">
            <form className="col s10">
              <div className="row">
                <div className="input-field col s12">
                  <textarea id="textarea1" className="materialize-textarea white"></textarea>
                  <label htmlFor="textarea1">Message</label>
                </div>
              </div>
            </form>
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