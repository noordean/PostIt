import React from 'react';
import PropTypes from 'prop-types';

export const ResetPassword = props => (
  <div id="resetPassword" className="modal">
    <div className="modal-content">
      <form className="group-form">
        <div className="row">
          <div className="input-field col s12">
            <input
              type="email"
              name="email"
              value={props.emailInput}
              onChange={props.onChange}
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="password"
              name="password"
              value={props.passwordInput}
              onChange={props.onChange}
            />
            <label htmlFor="password">New Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="password"
              name="confirmPassword"
              value={props.confirmPasswordInput}
              onChange={props.onChange}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <a
              href="##"
              className="btn waves-effect waves-light col s12 red darken-4"
              onClick={props.onSubmit}
            >Submit</a>
          </div>
        </div>
      </form>
    </div>
  </div>
);

ResetPassword.propTypes = {
  emailInput: PropTypes.string.isRequired,
  passwordInput: PropTypes.string.isRequired,
  confirmPasswordInput: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ResetPassword;
