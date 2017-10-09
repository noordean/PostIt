import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

import UserActions from '../../actions/UserActions';
import Auth from '../../utils/Auth';

/**
  * @class LoginWithGoogle
  */
export class LoginWithGoogle extends Component {
/**
  * @constructor
  * @param {object} props
  */
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  /**
  * description: redirects after google signup is successful
  *
  * @param {object} response google object information
  *
  * @return {void} void
  */
  responseGoogle(response) {
    const username = response.profileObj.name;
    const email = response.profileObj.email;
    this.props.registerGoogleUser(username, email)
      .then(() => {
        localStorage.setItem('user',
          JSON.stringify(this.props.userFromGoogle.response.user));
        Auth.setToken(this.props.userFromGoogle.response.user.token);
        browserHistory.push('/dashboard');
      });
  }

  /**
  * description: renders the google button
  *
  * @return {void} void
  */
  render() {
    return (
      <GoogleLogin
        className="google-login"
        clientId="865334857353-2cgfcv29lanb6k7rsdo4qubn6fp1dvm6.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  }
}

LoginWithGoogle.propTypes = {
  registerGoogleUser: PropTypes.func.isRequired,
  userFromGoogle: PropTypes.shape({
    response: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.bool,
    loading: PropTypes.bool
  }).isRequired
};

const mapStateToProps = state => ({
  userFromGoogle: state.userFromGoogle
});

const matchDispatchToProps = dispatch => bindActionCreators({
  registerGoogleUser: UserActions.registerGoogleUser
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(LoginWithGoogle);
