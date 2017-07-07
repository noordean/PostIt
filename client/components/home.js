import React, {Component} from "react";


export default class Home extends Component{
  render(){
    return (
      <div>
        <div className="slider">
          <ul className="slides">
            <li>
              <img src="public/image/group.jpg" alt="connected-people.jpg"/>
              <div className="caption center-align">
                <h3 className="light grey-text text-lighten-3">Things work well when a group of people know each other.</h3>
              </div>
           </li>
           <li>
             <img src="public/image/thought.png"/>
             <div className="caption left-align">
               <h3 className="light grey-text text-lighten-3">A small group of thoughtful people could change the world.</h3>
             </div>
           </li>
           <li>
             <img src="public/image/groupstudy.jpg"/>
             <div className="caption right-align">
               <h3 className="light grey-text text-lighten-3">Collaborate and get the work done.</h3>
             </div>
           </li>
           <li>
             <img src="public/image/groupfamily.jpg"/>
             <div className="caption center-align">
               <h3 className="light grey-text text-lighten-3">This is my group, this is my family.</h3>
             </div>
           </li>
        </ul>
     </div>  
   </div>
    )
  }
}