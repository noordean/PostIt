import React, {Component} from "react";
import Home from './home';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { getGroups } from '../actions/getGroupsAction';
import SideNav from './sidenav';
import Pagination from './pagination';

class Dashboard extends Component{
  setGroupIDHandler(groupID, groupName) {
    localStorage.setItem('groupID', groupID);
    localStorage.setItem('groupName', groupName);
  }
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
                            <Link to="messageboard" className="red-text text-accent-1" onClick={this.setGroupIDHandler.bind(this, group.id, group.groupname)}>View Message Board</Link>
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
      <Pagination/>
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