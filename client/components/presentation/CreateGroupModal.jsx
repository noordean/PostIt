import React from 'react';
import PropTypes from 'prop-types';

export const CreateGroupModal = props => (
  <div id="createGroup" className="modal">
    <div className="modal-content">
      <form className="group-form" id="createForm" onSubmit={props.createGroup}>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="text"
              name="groupName"
              onChange={props.onChange}
              value={props.groupName}
            />
            <label htmlFor="password">Group Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea
              id="textarea1"
              name="groupDescription"
              className="materialize-textarea white"
              onChange={props.onChange}
              value={props.groupDescription}
            />
            <label htmlFor="password">Description</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="submit"
              value="Create"
              className="btn col s12 red darken-4"
            />
          </div>
        </div>
      </form>
    </div>
    <div className="modal-footer">
      <a
        href="#!"
        className="modal-action modal-close waves-effect waves-green btn-flat"
      >Cancel</a>
    </div>
  </div>);

CreateGroupModal.propTypes = {
  createGroup: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
  groupDescription: PropTypes.string.isRequired
};

export default CreateGroupModal;
