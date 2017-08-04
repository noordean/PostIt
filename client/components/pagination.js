import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getGroups } from '../actions/getGroupsAction';
import { getAllGroups } from '../actions/getAllGroups';

class Pagination extends Component {
  loadGroups(event) {
    event.preventDefault();
    const offset = 6;
    const limit = 6;
    localStorage.setItem('offset', (Number(event.target.innerHTML) * offset) - 6);
    this.props.getGroups((Number(event.target.innerHTML) * offset) - 6, limit);
  }
  loadPreviousGroups(event) {
    event.preventDefault();
    if (localStorage.offset) {
      if (Number(localStorage.offset) > 0) {
        this.props.getGroups(Number(localStorage.offset) - 6, 6);
        localStorage.setItem('offset', Number(localStorage.offset) - 6)
      }
    }
  }
  loadNextGroups(event) {
    event.preventDefault();
    if (localStorage.offset) {
      if ((this.props.usersAllGroups.reqStatus.message.length - Number(localStorage.offset) >= 6)) {
        this.props.getGroups(Number(localStorage.offset) + 6, 6);
        localStorage.setItem('offset', Number(localStorage.offset) + 6)
      }
    }
  }
  componentDidMount() {
    this.props.getAllGroups(0);
  }
  render() {
    const pageList = [];
    if (this.props.usersAllGroups.reqProcessed) {
      if (this.props.usersAllGroups.reqStatus.message.length > 0) {
        pageList[0] = <li className="waves-effect" key={0}><a href="#!" onClick={this.loadPreviousGroups.bind(this)}><i className="material-icons">chevron_left</i></a></li>
        const totalRecords = this.props.usersAllGroups.reqStatus.message.length;
        let pageNumber = Math.ceil(totalRecords/6);
        const checkPageNumber = pageNumber;
        while (pageNumber > 0) {
          pageList.push(<li className="waves-effect" key={pageNumber}><a href="#!" onClick={this.loadGroups.bind(this)}>{checkPageNumber-(pageNumber-1)}</a></li>)
          pageNumber -= 1;
        }
        pageList.push(<li className="waves-effect" key={checkPageNumber+1}><a href="#!" onClick={this.loadNextGroups.bind(this)}><i className="material-icons">chevron_right</i></a></li>)
      }
    }

    return (
        <ul className="pagination center">
          {pageList}
        </ul>
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

export default connect(mapStateToProps, matchDispatchToProps)(Pagination);