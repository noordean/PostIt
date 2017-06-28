import React from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import fetchUsers from '../actions/usersAction';

class User extends React.Component{
  componentWillMount() {
    this.props.fetchUsers(); 
  }
  render(){
    console.log(this.props.user)
    if (this.props.user.fetched === false) {
      return <div>Loading...</div>
    }
    return (
      <div>
          {this.props.user.users[0].postedby} {this.props.user.users[0].message}
      </div>
    )
  }
}

 function mapStateToProps(state) {
   return {
     user: state.user
   };
 }

 function matchDispatchToProps(dispatch) {
   return bindActionCreators({ fetchUsers: fetchUsers}, dispatch);
 }

export default connect(mapStateToProps, matchDispatchToProps)(User);