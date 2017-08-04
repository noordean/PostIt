import React, {Component} from "react";
import Home from './home';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { getGroups } from '../actions/getGroupsAction';
import { getAllGroups } from '../actions/getAllGroups';
import SideNav from './sidenav';
import ReactPaginate from 'react-paginate';

class Dashboard extends Component{
  setGroupIDHandler(groupID, groupName) {
    localStorage.setItem('groupID', groupID);
    localStorage.setItem('groupName', groupName);
  }
  componentDidMount() {
    const limit = 6;
    this.props.getAllGroups(0);
    if (localStorage.groupOffset) {
      this.props.getGroups(localStorage.groupOffset, limit);
    } else {
      this.props.getGroups(0, limit);
    }

  }

  handlePageClick(data) {
    const limit = 6;
    let selected = data.selected;
    let offset = Math.ceil(selected * 6);
    localStorage.setItem('groupOffset', offset);
    this.props.getGroups(offset, limit);
  };

  render() {
    console.log("beginnnnnnin");
    console.log(this.props.usersAllGroups.reqStatus.message);
    console.log('endddddddddd');
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
      <ReactPaginate previousLabel={'Prev'}
                      nextLabel={'Next'}
                      breakLabel={'...'}
                      breakClassName={"break-me"}
                      pageCount={2}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick.bind(this)}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"} />
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersGroups: state.usersGroups,
    usersAllGroups: state.usersAllGroups
  };
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ getGroups: getGroups, getAllGroups: getAllGroups}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);
