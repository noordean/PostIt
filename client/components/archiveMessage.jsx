import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Home from '../components/home.jsx';
import MessageActions from '../actions/message';

/**
  * @class ArchiveMessage
  */
export class ArchiveMessage extends Component {
/**
  * @constructor
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      responseMsg: ''
    };
  }

  /**
  * description: controls what happens after component get rendered
  * @return {void} void
  */
  componentDidMount() {
    this.props.getArchivedMessages(this.props.params.groupId, JSON.parse(localStorage.user).id);
  }

  /**
  * description: executes when the state changes
  * @param {object} nextProps the next state
  * @return {void} void
  */
  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.archivedMessages.messages,
      responseMsg: nextProps.archivedMessages.responseMsg
    });
  }

  /**
  * description: renders the component
  * @return {void} void
  */
  render() {
    if (!localStorage.user) {
      return <Home />;
    }

    let archiveBoard;
    if (this.state.responseMsg !== '') {
      archiveBoard = <div className="center">{this.state.responseMsg}</div>;
    } else if (this.props.archivedMessages.loading) {
      archiveBoard = <div className="center">Loading messages...</div>;
    } else if (this.state.messages.length > 0) {
      archiveBoard = this.state.messages.map((message) => {
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
      archiveBoard = <div className="center">There is no archived message yet</div>
    }

    return (
      <div>
        {archiveBoard}
      </div>
    );
  }
}

ArchiveMessage.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    archivedMessages: state.archiveMessages
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getArchivedMessages: MessageActions.getArchivedMessages
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ArchiveMessage);
