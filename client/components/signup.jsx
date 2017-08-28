import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import UsersActions from '../actions/user';

/**
  * @class SignUp
  */
class SignUp extends Component {
/**
  * @constructor
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      signUpResponse: ''
    };
    this.registerHandler = this.registerHandler.bind(this);
  }

  /**
  * description: executes when component is just about to get rendered
  * @return {void} void
  */
  componentWillUnmount() {
    // return state to its initial value
    this.props.userRegistration.reqStatus = {};
    this.props.userRegistration.reqError = null;
    this.props.userRegistration.reqProcessed = false;
    this.props.userRegistration.reqProcessing = false;
  }

  /**
  * description: controls inputs state
  * @param {object} event the event object
  * @return {void} void
  */
  registerHandler(event) {
    event.preventDefault();
    const username = this.refs.usernameInput.value;
    const email = this.refs.emailInput.value;
    const phone = this.refs.phoneInput.value;
    const password = this.refs.passwordInput.value;
    const confirmPassword = this.refs.confirmPasswordInput.value;
    if (password !== confirmPassword) {
      this.refs.clientError.innerHTML = 'The two passwords did not match';
    } else {
      this.refs.clientError.innerHTML = '';
      this.props.registerUser(username, email, password, phone)
        .then(() => {
          if (this.props.userRegistration.reqStatus.message === 'Registration successful') {
            this.refs.formElement.reset();
            this.setState({
              signUpResponse: this.props.userRegistration.reqStatus.message
            });
          } else {
            this.setState({
              signUpResponse: this.props.userRegistration.reqStatus.message
            });
          }
          if (this.props.userRegistration.reqError) {
            this.setState({
              signUpResponse: 'Sorry, unexpected error occured'
            });
          }
        });
    }
  }

  /**
  * description: renders the component
  * @return {void} void
  */
  render() {
    let errorMsg = <div>{this.state.signUpResponse}</div>;
    if (this.state.signUpResponse === 'Registration successful') {
      errorMsg = <div>Registration successful, click <Link to="/signin">here</Link> to login</div>;
    }
    return (
      <div className="container">
        <div id="register-page" className="row">
          <div className="col s12 z-depth-4 card-panel">
            <form className="register-form" onSubmit={this.registerHandler} ref="formElement">
              <div className="row">
                <div className="input-field col s12 center">
                  <img id="reg-img" src="client/src/public/image/regsiter.jpg" alt="register img" className="circle responsive-img valign profile-image-login" />
                  <div ref="clientError" />
                  {errorMsg}
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input id="username" type="text" ref="usernameInput" required />
                  <label htmlFor="username" className="center-align">Username</label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="material-icons prefix">email</i>
                  <input id="email" type="email" ref="emailInput" required />
                  <label htmlFor="email" className="center-align">Email</label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="material-icons prefix">phone</i>
                  <input id="phonenumber" type="text" ref="phoneInput" required />
                  <label htmlFor="email" className="center-align">Phone Number</label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input id="password" type="password" ref="passwordInput" required />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input id="password-again" type="password" ref="confirmPasswordInput" required />
                  <label htmlFor="password-again">Confirm Password</label>
                </div>
              </div>
              <div className="row">
                <input type="submit" value="Register Now" className="btn col s12 red darken-4" />
                <div className="input-field col s12">
                  <p className="margin center medium-small sign-up">Already have an account? <a href="page-login.html">Login</a></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  userRegistration: PropTypes.object,
  registerUser: PropTypes.func
};

const mapStateToProps = state => ({
  userRegistration: state.userRegistration
});

const matchDispatchToProps = dispatch => bindActionCreators({
  registerUser: UsersActions.registerUser }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(SignUp);
