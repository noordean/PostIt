import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';

import UserActions from '../actions/user';
import authorization from '../utils/authorization';

/**
  * @class LoginWithGoogle
  */
class LoginWithGoogle extends Component {
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
  * @param {object} response google object information
  * @return {void} void
  */
  responseGoogle(response) {
    const username = response.profileObj.name;
    const email = response.profileObj.email;
    this.props.registerUserFromGoogle(username, email)
      .then(() => {
        localStorage.setItem('user', JSON.stringify(this.props.userFromGoogle.response.user));
        authorization(this.props.userFromGoogle.response.user.token);
        browserHistory.push('/dashboard');
      });
  }

  /**
  * description: render the google button
  * @return {void} void
  */
  render() {
    return (
      <GoogleLogin
        className='google-login'
        clientId='865334857353-2cgfcv29lanb6k7rsdo4qubn6fp1dvm6.apps.googleusercontent.com'
        buttonText='Login with Google'
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userFromGoogle: state.userFromGoogle
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    registerUserFromGoogle: UserActions.registerUserFromGoogle
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(LoginWithGoogle);
