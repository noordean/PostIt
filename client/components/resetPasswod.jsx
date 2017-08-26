import React from 'react';

const ResetPassword = (props) =>
  (
    <div id="modal3" className="modal">
      <div className="modal-content">
        <form className="group-form">
          <div className="text center">{props.errorMsg}</div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="email"
                name="email"
                value = {props.emailInput}
                onChange = {props.onChange}
                />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="password"
                name="password"
                value = {props.passwordInput}
                onChange = {props.onChange}
                 />
              <label htmlFor="password">New Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="password"
                name="confirmPassword"
                value = {props.confirmPasswordInput}
                onChange = {props.onChange}
                 />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <a href="##" className="btn waves-effect waves-light col s12 red darken-4" onClick={props.onSubmit}>Submit</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

export default ResetPassword;
