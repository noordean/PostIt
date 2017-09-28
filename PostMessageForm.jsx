import React from 'react';
import PropTypes from 'prop-types';

export const PostMessageForm = props => (
  <div className="row" id="postArea">
    <form className="col s12" id="textareaForm">
      <div className="row">
        <div className="input-field col s12 col m8">
          <textarea
            id="textarea1"
            value={props.messageInput}
            name="messageInput"
            onChange={props.onChange}
          />
          <label htmlFor="textarea1">Message</label>
        </div>
        <div className="col col s12 m2">
          <p>
            <input
              name="group1"
              type="radio"
              id="test1"
              value="Normal"
              onClick={props.getMsgStatus}
            />
            <label htmlFor="test1">Normal</label>
          </p>
          <p>
            <input
              name="group1"
              type="radio"
              id="test2"
              value="Urgent"
              onClick={props.getMsgStatus}
            />
            <label htmlFor="test2">Urgent</label>
          </p>
          <p>
            <input
              name="group1"
              type="radio"
              id="test3"
              value="Critical"
              onClick={props.getMsgStatus}
            />
            <label htmlFor="test3">Critical</label>
          </p>
        </div>
        <div className="input-field col s12 col m2">
          <a
            href="##"
            className="btn waves-effect waves-light col s12 red darken-4"
            onClick={props.postMessageHandler}
          >Post</a>
        </div>
      </div>
    </form>
  </div>);

PostMessageForm.propTypes = {
  postMessageHandler: PropTypes.func.isRequired,
  getMsgStatus: PropTypes.func.isRequired,
  messageInput: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default PostMessageForm;
