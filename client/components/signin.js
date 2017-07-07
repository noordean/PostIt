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
      <div className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">    
        {errorMsg}                
        <div className="panel panel-info" >
          <div className="panel-heading">
            <div className="panel-title">Login</div>
          </div>     
         <div className="panel-body" >
           <form id="loginform" className="form-horizontal" role="form">        
             <div className="input-group">
               <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                 <input id="login-username" type="text" className="form-control" name="username" placeholder="username" ref="usernameInput" required/>
             </div>
             <div className="input-group">
               <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                 <input id="login-password" type="password" className="form-control" name="password" placeholder="password" ref="passwordInput" required/>
             </div>    
             <div className="form-group">
               <div className="col-sm-12 controls">
                 <a id="btn-login" href="#" className="btn btn-success" onClick={this.loginHandler.bind(this)}>Login </a>
                 <a id="btn-fblogin" href="#" className="btn btn-primary">Login with Google</a>
               </div>
             </div>
             <div className="form-group">
               <div className="col-md-12 control">
                 <div className="create-account">Don't have an account? <Link to="signup">Sign Up Here</Link></div>
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