import React, {Component} from "react";


export default class SignUp extends Component{
  render(){
    return (
        <div className="row centered-form">
          <div className="mainbox col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
            <div className="panel panel-default">
              <div className="panel-heading">
		        <h3 className="panel-title">Get a PostIt account <small>It's free!</small></h3>
	          </div>
	          <div className="panel-body">
		        <form role="form">
		          <div className="form-group">
		            <input type="text" name="username" id="username" className="form-control" placeholder="Username"/>
		          </div>
		          <div className="form-group">
			        <input type="email" name="email" id="email" className="form-control" placeholder="Email Address"/>
		          </div>
		          <div className="row">
			        <div className="col-xs-6 col-sm-6 col-md-6">
			          <div className="form-group">
			            <input type="password" name="password" id="password" className="form-control" placeholder="Password"/>
			          </div>
			        </div>
		            <div className="col-xs-6 col-sm-6 col-md-6">
			          <div className="form-group">
			            <input type="password" name="password_confirmation" id="password_confirmation" className="form-control" placeholder="Confirm Password"/>
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