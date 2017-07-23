import React, {Component} from "react";


export default class Dashboard extends Component{
  render(){
    return (
        <div>
          <div className="row group-cards">
            <div className="col s12 m6">
              <div className="card">
                <div className="card-content grey lighten-4 text">
                  <span className="card-title">Bootcamp</span>
                  <p>64 group members</p>
                </div>
              <div className="card-action grey lighten-4">
                <a href="#" className="red-text text-accent-1">View Message Board</a>
              </div>
            </div>
          </div>

          <div className="col s12 m6">
            <div className="card">
              <div className="card-content grey lighten-4 text">
                <span className="card-title">Andela General</span>
                <p>4 group members</p>
              </div>
            <div className="card-action grey lighten-4">
              <a href="#" className="red-text text-accent-1">View Message Board</a>
            </div>
          </div>
        </div>

        <div className="col s12 m6">
          <div className="card">
            <div className="card-content grey lighten-4 text">
              <span className="card-title">Andela21 Group A</span>
              <p>10 group members</p>
            </div>
            <div className="card-action grey lighten-4">
              <a href="#" className="red-text text-accent-1">View Message Board</a>
            </div>
          </div>
        </div>

        <div className="col s12 m6">
          <div className="card">
            <div className="card-content grey lighten-4 text">
              <span className="card-title">Andela21 Random</span>
              <p>4 group members</p>
            </div>
            <div className="card-action grey lighten-4">
              <a href="#" className="red-text text-accent-1">View Message Board</a>
            </div>
          </div>
      </div>

      <div className="col s12 m6">
        <div className="card">
          <div className="card-content grey lighten-4 text">
            <span className="card-title">Andela21 Random</span>
            <p>4 group members</p>
          </div>
          <div className="card-action grey lighten-4">
            <a href="#" className="red-text text-accent-1">View Message Board</a>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
}