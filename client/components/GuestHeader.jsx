import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ResetPassword from './ResetPasswod.jsx';
import UserActions from '../actions/user';

/**
  * @class GuestHeader
  */
export class GuestHeader extends Component {
/**
  * @constructor
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      responseMsg: ''
    };
    this.openPasswordReset = this.openPasswordReset.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitResetPassword = this.submitResetPassword.bind(this);
  }

  /**
  * description: controls what happens when state is about to change
  * @param {object} nextProps The next state
  * @return {void} void
  */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        responseMsg: nextProps.sentMail.responseMsg
      });
    }
  }

  /**
  * description: controls inputs state
  * @param {object} element the current elementv
  * @return {void} void
  */
  onChange(element) {
    this.setState({
      [element.target.name]: element.target.value,
    });
  }


  /**
  * description: controls the resetPassword form
  * @param {object} event the event being executed
  * @return {void} void
  */
  submitResetPassword(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        responseMsg: 'The two passwords did not match'
      });
    } else {
      this.props.sendPasswordResetMail(this.state.email, this.state.password);
    }
  }

  /**
  * description: It opens the resetPassword modal dynamically
  * @param {event} event the event being executed
  * @return {void} void
  */
  openPasswordReset(event) {
    event.preventDefault()
      $('#resetPassword').modal('open');
  }


  /**
  * description: renders the component
  * @return {void} void
  */
  render() {
    return (
      <div>
        <ResetPassword
          errorMsg={this.state.responseMsg}
          onChange={this.onChange}
          emailInput={this.state.email}
          passwordInput={this.state.password}
          confirmPasswordInput={this.state.confirmPassword}
          onSubmit={this.submitResetPassword}
        />
        <nav>
          <div className="nav-wrapper red darken-4">
            <Link id="navLogo" href="/" className="brand-logo left">PostIt</Link>
            <ul className="right">
              <li><a
                className="waves-effect waves-light btn modal-trigger red darken-4"
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

const mapStateToProps = (state) => {
  return {
    sentMail: state.sentMail
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    sendPasswordResetMail: UserActions.sendPasswordResetMail
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(GuestHeader);
