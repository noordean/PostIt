import 'babel-polyfill';
import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import UsersActions from '../actions/user';
import {Link} from 'react-router';

class SignUp extends Component{

	registerHandler(event) {
		event.preventDefault();
		const username = this.refs.usernameInput.value;
		const email = this.refs.emailInput.value;
		const password = this.refs.passwordInput.value;
		const confirmPassword = this.refs.confirmPasswordInput.value;
		if (password !== confirmPassword) {
			this.refs.clientError.innerHTML = 'The two passwords did not match';
		} else {
			this.refs.clientError.innerHTML = '';
		  this.props.registerUser(username, email, password);
		}
	}
  
	componentWillUnmount() {
		// return state to its initial value
		this.props.user.regStatus = {};
		this.props.user.regError = null;
		this.props.user.regProcessed = false;
		this.props.user.regProcessing = false;
	}

	render() {
		let errorMsg = <div></div>;
		if (this.props.user.regProcessing) {
			errorMsg = <div className="error-message">Registering user...</div>;
		}
		if (this.props.user.regProcessed) {
			if (this.props.user.regStatus.message === 'Registration successful') {
			  errorMsg = <div className="error-message gr">{this.props.user.regStatus.message}, Click <Link to="/signin"> here </Link> to login</div>;
			} else {
			  errorMsg = <div className="error-message re">{this.props.user.regStatus.message}</div>;
			}
		}
		if (this.props.user.regError !== null) {
			errorMsg = <div className="error-message re">An unexpected error occured. Kindly check your internet connection</div>;
		}
    return (
						<div className="container">
  						<div id="register-page" className="row">
    						<div className="col s12 z-depth-4 card-panel">
      						<form className="register-form" onSubmit={this.registerHandler.bind(this)}>
        						<div className="row">
          						<div className="input-field col s12 center">
												<img id="reg-img" src="public/image/regsiter.jpg" alt="" className="circle responsive-img valign profile-image-login"/>
												<div ref="clientError"></div>
												{errorMsg}
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
            						<i className="material-icons prefix">email</i>
            						<input id="email" type="email" ref="emailInput" required/>
            						<label htmlFor="email" className="center-align">Email</label>
          						</div>
        						</div>
        						<div className="row margin">
          					<div className="input-field col s12">
            					<i className="material-icons prefix">lock</i>
            					<input id="password" type="password" ref="passwordInput" required/>
            					<label htmlFor="password">Password</label>
          					</div>
        					</div>
        					<div className="row margin">
          					<div className="input-field col s12">
            					<i className="material-icons prefix">lock</i>
            					<input id="password-again" type="password" ref="confirmPasswordInput" required/>
            					<label htmlFor="password-again">Confirm Password</label>
          					</div>
        					</div>
        					<div className="row">
          					<div className="input-field col s12">
											<input type="submit" value="Register Now" className="btn waves-effect waves-light col s12 red darken-4"/>
          					</div>
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ registerUser: UsersActions.registerUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SignUp);