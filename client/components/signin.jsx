import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

import UsersActions from '../actions/user';
import { browserHistory } from 'react-router';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginResponse: ''
    }
  }
  loginHandler(event) {
    event.preventDefault();
    const username = this.refs.usernameInput.value;
    const password = this.refs.passwordInput.value;
    this.props.loginUser(username, password)
    .then(() => {
      if (this.props.userLogin.reqStatus.message === 'You are now logged in') {
       localStorage.setItem('user', JSON.stringify(this.props.userLogin.reqStatus.user));
        browserHistory.push('/dashboard');
        // window.location.reload();
      } else {
        this.setState({
          loginResponse: this.props.userLogin.reqStatus.message
        });
      }
      if (this.props.userLogin.reqError) {
        this.setState({
          loginResponse: 'Sorry, unexpected error occurred'
        });
      }
    })
  }
  componentWillUnmount() {
    this.setState({
      loginResponse: ''
    });
  }
  render() {
    return (
      <div className="container">
        <div id="login-page" className="row">
          <div className="col s12 z-depth-4 card-panel">
            <form className="login-form" onSubmit={this.loginHandler.bind(this)}>
              <div className="row">
                <div className="input-field col s12 center">
                  <img id="login-img" src="/public/image/login.jpg" alt="" className="circle responsive-img valign profile-image-login"/>
                  <div>{this.state.loginResponse}</div>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input id="username" type="text" ref="usernameInput" required/>
                  <label htmlFor="username" className="center-align">Username</label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input id="password" type="password" ref="passwordInput" required/>
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
                <div className="input-field col s12">
                  <input type="submit" value="Login" className="btn col s12 red darken-4"/>
                </div>
              </div>
              <div className="row">
              <div className="input-field col s6 m6 l6">
                <p className="margin medium-small"><a href="#">Register Now!</a></p>
              </div>
              <div className="input-field col s6 m6 l6">
                <p className="margin right-align medium-small"><a href="#">Forgot password ?</a></p>
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
  userLogin: PropTypes.object,
	loginUser: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    userLogin: state.userLogin
  };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ loginUser: UsersActions.loginUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SignIn);