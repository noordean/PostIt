import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ResetPassword from './resetPasswod.jsx';
import UserActions from '../actions/user';

class GuestHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      responseMsg: ''
    }
    this.openPasswordReset = this.openPasswordReset.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitResetPassword = this.submitResetPassword.bind(this);
  }
  onChange(element) {
    this.setState({
      [element.target.name]: element.target.value,
    });
  }

  submitResetPassword(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        responseMsg: 'The two passwords did not match'
      });
    } else {
    this.props.sendPasswordResetMail(this.state.email, this.state.password)
    .then(() => {
      if (this.props.sentMail.responseMsg !== '') {
        this.setState({
          responseMsg: this.props.sentMail.responseMsg
        });
      } else if (this.props.sentMail.error) {
        this.setState({
          responseMsg: 'Sorry, your request could not be sent'
        })
      } else if (this.props.sentMail.loading) {
        this.setState({
          responseMsg: 'Loading...'
        })
      }
    })
    }
  }

  openPasswordReset(event) {
    event.preventDefault()
      $('#modal3').modal('open');
  }
  render() {
    return (
      <div>
        <ResetPassword
          errorMsg = {this.state.responseMsg}
          onChange = {this.onChange}
          emailInput = {this.state.email}
          passwordInput = {this.state.password}
          confirmPasswordInput = {this.state.confirmPassword}
          onSubmit = {this.submitResetPassword}/>
      <nav>
        <div className="nav-wrapper red darken-4">
          <Link id="navLogo" href="/" className="brand-logo left">PostIt</Link>
          <ul className="right">
            <li><a className="waves-effect waves-light btn modal-trigger red darken-4" href="#modal3" onClick={this.openPasswordReset}>Reset Password</a></li>
            <li><Link to="/signup">Join PostIt</Link></li>
            <li><Link to="/signin">Log in</Link></li>
          </ul>
        </div>
      </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sentMail: state.sentMail
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    sendPasswordResetMail: UserActions.sendPasswordResetMail
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(GuestHeader);
