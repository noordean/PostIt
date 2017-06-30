import 'babel-polyfill';
import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import registerUsers from '../actions/usersAction';
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
		this.props.registerUsers(username, email, password);
		}
	}

	render() {
		let errorMsg = <div></div>;
		if (this.props.user.inserting) {
			errorMsg = <div className="error-message">Registering user...</div>;
		}
		if (this.props.user.inserted) {
			if (this.props.user.regStatus.message === 'Registration successful') {
			  errorMsg = <div className="error-message gr">{this.props.user.regStatus.message}, Click <Link to="/login"> here </Link> to login</div>;
			} else {
			  errorMsg = <div className="error-message re">{this.props.user.regStatus.message}</div>;
			}
		}
		if (this.props.user.error !== null) {
			errorMsg = <div className="error-message re">An unexpected error occured. Kindly check your internet connection</div>;
		}
    return (
        <div className="row centered-form">
					<div ref="clientError" className="error-message re"></div>
					{errorMsg}
          <div className="mainbox col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
            <div className="panel panel-default">
              <div className="panel-heading">
		        <h3 className="panel-title">Get a PostIt account <small>It's free!</small></h3>
	          </div>
	          <div className="panel-body">
		        <form role="form" onSubmit={this.registerHandler.bind(this)}>
		          <div className="form-group">
		            <input type="text" name="username" id="username" className="form-control" placeholder="Username" ref="usernameInput" minLength="5" maxLength="12" required/>
		          </div>
		          <div className="form-group">
			        <input type="email" name="email" id="email" className="form-control" placeholder="Email Address" ref="emailInput" required/>
		          </div>
		          <div className="row">
			        <div className="col-xs-6 col-sm-6 col-md-6">
			          <div className="form-group">
			            <input type="password" name="password" id="password" className="form-control" placeholder="Password" ref="passwordInput" pattern="[a-zA-Z0-9]{4,}" minLength="6" required/>
			          </div>
			        </div>
		            <div className="col-xs-6 col-sm-6 col-md-6">
			          <div className="form-group">
			            <input type="password" name="password_confirmation" id="password_confirmation" className="form-control" placeholder="Confirm Password" ref="confirmPasswordInput" pattern="[a-zA-Z0-9]{4,}" minLength="6" required/>
			          </div>
			        </div>
		         </div>   			
		         <input type="submit" value="Register" className="btn btn-info btn-block"/>	    		
		       </form>
	        </div>
	     </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ registerUsers: registerUsers}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SignUp);