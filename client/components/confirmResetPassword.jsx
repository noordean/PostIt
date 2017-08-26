import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import UsersActions from '../actions/user';

class ConfirmResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseMsg: ''
    }
  }

  componentWillMount() {
    this.props.verifyPasswordReset(this.props.params.token)
    .then(() => {
      if (this.props.verifyMailUrl.responseMsg === 'Password changed successfully') {
        this.setState({
            responseMsg: 'success'
        });
      } else if (this.props.verifyMailUrl.error) {
          this.setState({
              responseMsg: 'failure'
          });
      } else {
          this.setState({
              responseMsg: this.props.verifyMailUrl.responseMsg
          });
      }
    })
  }

  render() {
    let status;
    if (this.state.responseMsg === 'success') {
        status = <p className="text center">Password successfully changed. You can now click <Link to='/signin'>here</Link> to login</p>
    } else {
        status = <p className="text center">{this.state.responseMsg}</p>
    }
    return (
      <div>
        {status}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    verifyMailUrl: state.verifyMailUrl
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    verifyPasswordReset: UsersActions.verifyPasswordReset
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(ConfirmResetPassword);
