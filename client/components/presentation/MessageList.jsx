import React from 'react';
import PropTypes from 'prop-types';

export const MessageList = props => (<div>{props.messages.map(message => (
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
                onClick={props.openSeenMsgModal.bind(null, message.id)}
              >seen by:</a>
            </small>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>))}
</div>);

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default MessageList;
