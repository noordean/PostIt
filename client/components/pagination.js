import React, {Component} from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getGroups } from '../actions/getGroupsAction';

class Pagination extends Component {
  loadGroups(event) {
    event.preventDefault();
    const offset = 6;
    this.props.getGroups((Number(event.target.innerHTML) * offset) - 6 );
  }
  render() {
    return (
        <ul className="pagination center">
          <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
          <li className="active"><a href="#!" onClick={this.loadGroups.bind(this)}>1</a></li>
          <li className="waves-effect"><a href="#!" onClick={this.loadGroups.bind(this)}>2</a></li>
          <li className="waves-effect"><a href="#!" onClick={this.loadGroups.bind(this)}>3</a></li>
          <li className="waves-effect"><a href="#!" onClick={this.loadGroups.bind(this)}>4</a></li>
          <li className="waves-effect"><a href="#!" onClick={this.loadGroups.bind(this)}>5</a></li>
          <li className="waves-effect"><a href="#!" onClick={this.loadGroups.bind(this)}><i className="material-icons">chevron_right</i></a></li>
        </ul>
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

export default connect(mapStateToProps, matchDispatchToProps)(Pagination);