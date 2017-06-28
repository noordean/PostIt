import React, {Component} from "react";
import {Link} from 'react-router';

export default class SignIn extends Component{
  render(){
    return (
      <div className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
        <div className="panel panel-info" >
          <div className="panel-heading">
            <div className="panel-title">Login</div>
         </div>     
         <div className="panel-body" >
           <form id="loginform" className="form-horizontal" role="form">        
             <div className="input-group">
               <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                 <input id="login-username" type="text" className="form-control" name="username" value="" placeholder="username"/>
             </div>
             <div className="input-group">
               <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                 <input id="login-password" type="password" className="form-control" name="password" placeholder="password"/>
             </div>    
             <div className="form-group">
               <div className="col-sm-12 controls">
                 <a id="btn-login" href="#" className="btn btn-success">Login </a>
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
