import React, {Component} from "react";


export default class Dashboard extends Component{
  render(){
    return (
            <div className="container cards">
	          <div className="row">
	            <div className="col-md-4">
	              <div className="box">
                    <h5>Andela21 general</h5>
                    <hr/>
                    <p>4 members</p>
                    <a href="#" className="btn btn-primary">View Message Board</a>
                  </div>
	            </div>
	          <div className="col-md-4">
	            <div className="box">
                   <h5>Bootcamp</h5>
                   <hr/>
                   <p>64 members</p>
                   <a href="#" className="btn btn-primary">View Message Board</a> 
                </div>
	         </div>
	         <div className="col-md-4">
	           <div className="box">
                  <h5>Andela21 group a</h5>
                  <hr/>
                  <p>5 members</p>
                  <a href="#" className="btn btn-primary">View Message Board</a> 
              </div>
	        </div>
	        <div className="col-md-4">
	          <div className="box">
                 <h5>Andela21 random</h5>
                 <hr/>
                 <p>10 members</p>
                 <a href="#" className="btn btn-primary">View Message Board</a> 
              </div>
	       </div>
	    </div>
     </div>
    );
  }
}