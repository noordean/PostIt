import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';

import UserActions from '../actions/user';
import authorization from '../utils/authorization';

class LoginWithGoogle extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response) {
    console.log(response)
    const username = response.profileObj.name;
    const email = response.profileObj.email;
    this.props.registerUserFromGoogle(username, email)
    .then(() => {
      console.log(this.props.userFromGoogle.response.user);
      console.log('nuru testing')
      localStorage.setItem('user', JSON.stringify(this.props.userFromGoogle.response.user));
      authorization(this.props.userFromGoogle.response.user.token);
      browserHistory.push('/dashboard');
    })
  }

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
