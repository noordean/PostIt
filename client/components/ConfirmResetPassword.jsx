import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import UsersActions from '../actions/user';

/**
  * Description: component that get rendered through the link posted to user's email
  *
  * @class ConfirmResetPassword
  */
export class ConfirmResetPassword extends Component {
/**
  * @constructor
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.state = {
      responseMsg: ''
    };
  }

  /**
  * description: controls what happens before component get rendered
  *
  * @return {void} void
  */
  componentWillMount() {
    this.props.verifyPasswordReset(this.props.params.token);
  }

  /**
  * description: executes when the state changes
  *
  * @param {object} nextProps the next state
  *
  * @return {void} void
  */
  componentWillReceiveProps(nextProps) {
    this.setState({
      responseMsg: nextProps.verifyMailUrl.responseMsg
    });
  }

  /**
  * description: determines what get rendered
  *
  * @return {void} void
  */
  render() {
    let status;
    if (this.state.responseMsg === 'success') {
      status =
      (<p className="text center">
        Password successfully changed. You can now click
        <Link to="/signin">here</Link> to login
      </p>);
    } else {
      status = <p className="text center">{this.state.responseMsg}</p>;
    }
    return (
      <div>
        {status}
      </div>
    );
  }
}

ConfirmResetPassword.propTypes = {
  params: PropTypes.shape({ token: PropTypes.string.isRequired }).isRequired,
  verifyPasswordReset: PropTypes.func.isRequired,
  verifyMailUrl: PropTypes.shape({
    error: PropTypes.bool,
    responseMsg: PropTypes.string,
    loading: PropTypes.bool
  }).isRequired
};

const mapStateToProps = state => ({
  verifyMailUrl: state.verifyMailUrl
});

const matchDispatchToProps = dispatch => bindActionCreators({
  verifyPasswordReset: UsersActions.verifyPasswordReset
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(ConfirmResetPassword);
