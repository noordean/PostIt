import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import UsersActions from '../actions/UserActions';
import GoogleLogin from './GoogleLogin.jsx';
import displayError from '../utils/errorDisplay';

/**
  * @class Dashboard
  */
export class SignIn extends Component {
/**
  * @constructor
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: '',
      passwordInput: ''
    };
    this.loginHandler = this.loginHandler.bind(this);
    this.openResetPassword = this.openResetPassword.bind(this);
    this.onChange = this.onChange.bind(this);
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
  * description: controls user login
  * @param {object} event event object
  * @return {void} void
  */
  loginHandler(event) {
    event.preventDefault();
    const username = this.state.usernameInput;
    const password = this.state.passwordInput;
    this.props.loginUser(username, password)
      .then(() => {
        if (this.props.userLogin.reqStatus.message === 'You are now logged in') {
          localStorage.setItem('user',
            JSON.stringify(this.props.userLogin.reqStatus.user));
          browserHistory.push('/dashboard');
          return displayError('You are now logged in');
        }
        return displayError(this.props.userLogin.reqStatus.message);
      });
  }

  /**
  * description: opens the resetPassword modal
  * @param {object} event event object
  * @return {void} void
  */
  //eslint-disable-next-line
  openResetPassword(event) {
    event.preventDefault();
    $('#resetPassword').modal('open');
  }


  /**
  * description: renders the component
  * @return {void} void
  */
  render() {
    return (
      <div className="container">
        <div id="login-page" className="row">
          <div className="col s12 z-depth-4 card-panel">
            <form className="login-form" onSubmit={this.loginHandler}>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    id="username"
                    type="text"
                    name="usernameInput"
                    value={this.state.usernameInput}
                    onChange={this.onChange}
                    required
                  />
                  <label
                    htmlFor="username"
                    className="center-align"
                  >Username</label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input
                    id="password"
                    type="password"
                    name="passwordInput"
                    value={this.state.passwordInput}
                    onChange={this.onChange}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m12 l12  login-text">
                  <input type="checkbox" id="remember-me" />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    type="submit"
                    value="Login"
                    className="btn col s12 red darken-4 login-btn"
                  />
                </div>
                <div className="input-field col s6">
                  <GoogleLogin />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6 m6 l6">
                  <p
                    className="margin medium-small"
                  ><Link to="/signup">Register Now!</Link></p>
                </div>
                <div className="input-field col s6 m6 l6">
                  <p className="margin right-align medium-small">
                    <a href="##" onClick={this.openResetPassword}>
                      Forgot password ?
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  userLogin: PropTypes.shape({
    reqError: PropTypes.bool,
    loading: PropTypes.bool,
    reqStatus: PropTypes.object
  }).isRequired
};

const mapStateToProps = state => ({
  userLogin: state.userLogin
});

const matchDispatchToProps = dispatch => bindActionCreators({
  loginUser: UsersActions.loginUser }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(SignIn);
