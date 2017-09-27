import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ResetPassword from './ResetPasswod.jsx';
import UserActions from '../actions/UserActions';
import displayError from '../utils/errorDisplay';

/**
  * @class GuestHeader
  */
export class GuestHeader extends Component {
/**
  * @constructor
  *
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
    this.openPasswordReset = this.openPasswordReset.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitResetPassword = this.submitResetPassword.bind(this);
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
  * description: controls the resetPassword form
  *
  * @param {object} event the event being executed
  *
  * @return {void} void
  */
  submitResetPassword(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      return displayError('The two passwords did not match!');
    }
    this.props.mailPassword(this.state.email, this.state.password)
      .then(() => {
        if (!this.props.sentMail.success &&
          this.props.sentMail.responseMsg.length > 0) {
          return displayError(this.props.sentMail.responseMsg);
        }
        if (this.props.sentMail.success) {
          $('#resetPassword').modal('close');
          return displayError(this.props.sentMail.responseMsg);
        }
      });
  }

  /**
  * description: clears the resetPassword state inputs
  *
  * @return {void} void
  */
  clearResetPasswordState() {
    this.setState({
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  /**
  * description: It opens the resetPassword modal dynamically
  *
  * @param {event} event the event being executed
  *
  * @return {void} void
  */
  //eslint-disable-next-line
  openPasswordReset(event) {
    event.preventDefault();
    $('#resetPassword').modal('open', {
      complete: this.clearResetPasswordState()
    });
  }


  /**
  * description: renders the component
  *
  * @return {void} void
  */
  render() {
    return (
      <div>
        <ResetPassword
          onChange={this.onChange}
          emailInput={this.state.email}
          passwordInput={this.state.password}
          confirmPasswordInput={this.state.confirmPassword}
          onSubmit={this.submitResetPassword}
        />
        <nav>
          <div className="nav-wrapper red darken-4">
            <Link
              id="navLogo"
              href="/"
              className="brand-logo left"
            >PostIt</Link>
            <ul className="right">
              <li><a
                className="waves-effect waves-light btn modal-trigger red darken-4 reset-pass"
                href="#resetPassword"
                onClick={this.openPasswordReset}
              >Reset Password
              </a>
              </li>
              <li><Link to="/signup">Join PostIt</Link></li>
              <li><Link to="/signin">Log in</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

GuestHeader.propTypes = {
  mailPassword: PropTypes.func.isRequired,
  sentMail: PropTypes.shape({
    responseMsg: PropTypes.string,
    success: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool
  }).isRequired
};

const mapStateToProps = state => ({
  sentMail: state.sentMail
});

const matchDispatchToProps = dispatch => bindActionCreators({
  mailPassword: UserActions.mailPassword
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(GuestHeader);
