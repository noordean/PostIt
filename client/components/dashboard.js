import React, {Component} from "react";
import Home from './home';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { getGroups } from '../actions/getGroupsAction';

class Dashboard extends Component{
  componentDidMount() {
    this.props.getGroups();
  }
  render() {
    let dashboard;
    if (!localStorage.user) {
      dashboard = <Home/>;
    } else {
      if (this.props.usersGroups.reqProcessing) {
         dashboard = <div className="center">Loading groups...</div>
      }
      if (this.props.usersGroups.reqError !== null) {
        dashboard = <div className="center">Could not load groups. Kindly check your internet connection</div>      
      }
      if (this.props.usersGroups.reqProcessed) {
        if (this.props.usersGroups.reqStatus.message.length > 0) {
          dashboard = this.props.usersGroups.reqStatus.message.map((group) => {
            return (<div className="col s12 m6" key={group.id}>
                        <div className="card">
                          <div className="card-content grey lighten-4 text">
                            <span className="card-title">{group.groupname}</span>
                            <p>{group.groupmembers.length} group members</p>
                          </div>
                          <div className="card-action grey lighten-4">
                            <Link to={"messageboard/" + group.id} className="red-text text-accent-1">View Message Board</Link>
                          </div>
                        </div>
                      </div>);
          });
        } else {
          dashboard = <div className="center">You do not belong to any group yet</div>
        }
      } 
    }
    return (
    <div className="row group-cards">
      {dashboard}
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersGroups: state.usersGroups
  };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getGroups: getGroups}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);