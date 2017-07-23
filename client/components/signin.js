import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {loginUser} from '../actions/usersAction';

class SignIn extends Component{

  loginHandler(event) {
    event.preventDefault();
    const username = this.refs.usernameInput.value;
    const password = this.refs.passwordInput.value;
    this.props.loginUser(username, password);  
  }
  
  componentWillUnmount() {
    this.props.user.loginStatus = {};
    this.props.user.loginError = null;
    this.props.user.loginProcessed = false;
    this.props.user.loginProcessing = false;
  }
  render() {
		let errorMsg = <div></div>;
		if (this.props.user.loginProcessing) {
			errorMsg = <div className="error-message">Processing user for login...</div>;
		}
		if (this.props.user.loginProcessed) {
			if (this.props.user.loginStatus.message === 'You are now logged in') {
			  errorMsg = <div className="error-message gr">{this.props.user.loginStatus.message}</div>;
			} else {
			  errorMsg = <div className="error-message re">{this.props.user.loginStatus.message}</div>;
			}
		}
		if (this.props.user.loginError !== null) {
			errorMsg = <div className="error-message re">An unexpected error occured. Kindly check your internet connection</div>;
		}

    return (
          <div className="container">
            <div id="login-page" className="row">
              <div className="col s12 z-depth-4 card-panel">
              <form className="login-form">
                <div className="row">
                <div className="input-field col s12 center">
                  <img id="login-img" src="public/image/login.jpg" alt="" className="circle responsive-img valign profile-image-login"/>
                  {errorMsg}
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input id="username" type="text" ref="usernameInput"/>
                  <label htmlFor="username" className="center-align">Username</label>
                </div>
              </div>
              <div className="row margin">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input id="password" type="password" ref="passwordInput"/>
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
            <a href="#" className="btn waves-effect waves-light col s12 red darken-4" onClick={this.loginHandler.bind(this)}>Login</a>
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ loginUser: loginUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SignIn);