import axios from 'axios';
import { browserHistory } from 'react-router';

import Auth from '../utils/Auth';
import * as actionTypes from './actionTypes';
import toastMessage from '../utils/toastMessage';
/**
 * @class UserActions
 */
export default class UserActions {
  /**
  * Request to the API to register a user
  *
  * @static
  *
  * @param {String} username The username of the user
  * @param {String} email The email of the user
  * @param {String} password The password of the user
  * @param {String} phoneNumber The phone number of the user
  *
  * @returns {Object} dispatch object
  *
  * @memberof UserActions
  */
  static registerUser(username, email, password, phoneNumber) {
    return (dispatch) => {
      dispatch({ type: actionTypes.REGISTRATION_BEGIN });
      return axios.post('/api/v1/user/signup', {
        username,
        email,
        password,
        phoneNumber
      })
        .then((response) => {
          dispatch({ type: actionTypes.REGISTRATION_SUCCESSFUL,
            payload: response.data });
          browserHistory.push('/signin');
          return toastMessage('Registration successful. Kindly login here');
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: actionTypes.REGISTRATION_REJECTED,
              payload: { message: 'Sorry, an unexpected error occurred.' } });
          } else {
            dispatch({ type: actionTypes.REGISTRATION_UNSUCCESSFUL,
              payload: err.response.data });
          }
          return toastMessage(err.response.data.message);
        });
    };
  }

  /**
  * Request to the API to log a user in
  *
  * @static
  *
  * @param {String} username The username of the user
  * @param {String} password The password of the user
  *
  * @returns {Object} dispatch object
  *
  * @memberof UserActions
  */
  static loginUser(username, password) {
    return (dispatch) => {
      dispatch({ type: 'LOGIN_BEGINS' });
      return axios.post('api/v1/user/signin', {
        username,
        password
      })
        .then((response) => {
          dispatch({ type: 'LOGIN_SUCCESSFUL', payload: response.data });
          Auth.setToken(response.data.user.token);
          localStorage.setItem('user',
            JSON.stringify(response.data.user));
          browserHistory.push('/dashboard');
          return toastMessage('You are now logged in');
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'LOGIN_REJECTED',
              payload: { message: 'Sorry, an unexpected error occurred.' } });
          } else {
            dispatch({ type: 'LOGIN_UNSUCCESSFUL',
              payload: err.response.data });
          }
          return toastMessage(err.response.data.message);
        });
    };
  }

  /**
  * Request to the API to get members(users) of a group
  *
  * @static
  *
  * @param {Number} groupId The id of the group to get members for
  * @param {String} token the login token
  *
  * @returns {Object} dispatch object
  *
  * @memberof UserActions
  */
  static getGroupMembers(groupId) {
    return dispatch => axios.get(`/api/v1/group/${groupId}/users`)
      .then((response) => {
        dispatch({ type: 'GOT_MEMBERS', payload: response.data.users });
      })
      .catch((err) => {
        if (err.response.status === 500) {
          dispatch({ type: 'GET_MEMBERS_REJECTED',
            payload: err.response.data.message });
        } else {
          dispatch({ type: 'GET_MEMBERS_FAILED',
            payload: err.response.data.message });
        }
        return toastMessage(err.response.data.message);
      });
  }

  /**
  * Request to the API to add members(users) to a group
  *
  * @static
  *
  * @param {Number} groupId The id of the group to add members to
  * @param {String} userId The id's of the users to add
  * @param {String} token The JWToken to access the endpoint
  *
  * @returns {Object} dispatch object
  *
  * @memberof UserActions
  */
  static addGroupMembers(groupId, userId) {
    return dispatch => axios.post(`/api/v1/group/${groupId}/user`, {
      groupId,
      userId
    })
      .then((response) => {
        dispatch({ type: 'MEMBERS_ADDED', payload: response.data.message });
        return toastMessage('Users added');
      })
      .catch((err) => {
        if (err.response.status === 500) {
          dispatch({ type: 'ADD_MEMBERS_REJECTED',
            payload: err.response.data.message });
        } else {
          dispatch({ type: 'ADD_MEMBERS_FAILED',
            payload: err.response.data.message });
        }
        return toastMessage(err.response.data.message);
      });
  }

  /**
  * Request to the API to send confirmation mail to reset password
  *
  * @static
  *
  * @param {String} recepient The email of the user
  * @param {String} newPassword The new password of the user
  *
  * @returns {Object} dispatched object
  *
  * @memberof UserActions
  */
  static mailPassword(recepient, newPassword) {
    return (dispatch) => {
      dispatch({ type: 'RESET_PASSWORD_BEGINS' });
      return axios.post('/api/v1/user/reset-password', {
        recepient,
        newPassword
      })
        .then((response) => {
          dispatch({ type: 'RESET_PASSWORD_SUCCESSFUL',
            payload: response.data.message });
          return toastMessage(response.data.message);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'RESET_PASSWORD_REJECTED',
              payload: 'Sorry, an unexpected error occurred.' });
          } else {
            dispatch({ type: 'RESET_PASSWORD_UNSUCCESSFUL',
              payload: err.response.data.message });
          }
          return toastMessage(err.response.data.message);
        });
    };
  }

  /**
  * Request to the API to verify the url sent to user's email
  *
  * @static
  *
  * @param {String} mailToken The token attached to the url
  *
  * @returns {Object} dispatched object
  *
  * @memberof UserActions
  */
  static verifyPassword(mailToken) {
    return (dispatch) => {
      dispatch({ type: 'VERIFY_PASSWORD_BEGINS' });
      return axios.post('/api/v1/user/email/verify', {
        mailToken
      })
        .then((response) => {
          dispatch({ type: 'VERIFY_PASSWORD_SUCCESSFUL',
            payload: response.data.message });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'VERIFY_PASSWORD_REJECTED',
              payload: err.response.data.message });
          } else {
            dispatch({ type: 'VERIFY_PASSWORD_UNSUCCESSFUL',
              payload: err.response.data.message });
          }
          return toastMessage(err.response.data.message);
        });
    };
  }

  /**
  * Request to the API to register user with google+
  *
  * @static
  *
  * @param {String} username The username gotten from the user's credential
  * @param {String} email The email gotten from the user's credential
  *
  * @returns {Object} dispatched object
  *
  * @memberof UserActions
  */
  static registerGoogleUser(username, email) {
    return (dispatch) => {
      dispatch({ type: 'REGISTER_GOOGLE_USER_BEGINS' });
      return axios.post('/api/v1/user/signup/google', {
        username,
        email
      })
        .then((response) => {
          dispatch({ type: 'REGISTER_GOOGLE_USER_SUCCESSFUL',
            payload: response.data });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'REGISTER_GOOGLE_USER_REJECTED',
              payload: 'Sorry, an unexpected error occurred.' });
          } else {
            dispatch({ type: 'REGISTER_GOOGLE_USER_UNSUCCESSFUL',
              payload: err.response.data });
          }
          return toastMessage(err.response.data.message);
        });
    };
  }

  /**
  * Request to the API to send mail for notification
  *
  * @static
  *
  * @param {String} recepients The emails of the users to send to
  * @param {String} groupName The group name
  * @param {String} message The message posted 
  * @param {String} poster username of the poster
  *
  * @returns {string} dispatched object
  *
  * @memberof UserActions
  */
  static mailNotification(recepients, groupName, message) {
    return (dispatch) => {
      dispatch({ type: 'SEND_EMAIL_NOTIFICATION_BEGINS' });
      return axios.post('/api/v1/user/email', {
        recepients,
        groupName,
        message
      })
        .then((response) => {
          dispatch({ type: 'SEND_EMAIL_NOTIFICATION_SUCCESSFUL',
            payload: response.data.message });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'SEND_EMAIL_NOTIFICATION_REJECTED',
              payload: 'Sorry, an unexpected error occurred.' });
          } else {
            dispatch({ type: 'SEND_EMAIL_NOTIFICATION_UNSUCCESSFUL',
              payload: err.response.data.message });
          }
          return toastMessage(err.response.data.message);
        });
    };
  }

  /**
  * Request to the API to send mail for notification
  *
  * @static
  *
  * @param {Array} phoneNumbers users' phoneNumbers to send message to
  * @param {String} poster username of the poster 
  *
  * @returns {string} dispatched object
  *
  * @memberof UserActions
  */
  static smsNotification(phoneNumbers) {
    return (dispatch) => {
      dispatch({ type: 'SEND_SMS_NOTIFICATION_BEGINS' });
      return axios.post('/api/v1/user/sms', {
        phoneNumbers
      })
        .then((response) => {
          dispatch({ type: 'SEND_SMS_NOTIFICATION_SUCCESSFUL',
            payload: response.data.message });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'SEND_SMS_NOTIFICATION_REJECTED',
              payload: err.response.data.message });
          } else {
            dispatch({ type: 'SEND_SMS_NOTIFICATION_UNSUCCESSFUL',
              payload: err.response.data.message });
          }
          return toastMessage(err.response.data.message);
        });
    };
  }

  /**
  * Request to the API to get users that have read a message
  *
  * @static
  *
  * @param {Number} messageId The id of the message to get readers for
  * @param {Number} groupId The id of the group the message belongs
  *
  * @returns {Object} dispatch object
  *
  * @memberof MessageActions
  */
  static getReadMessageUsers(messageId, groupId) {
    return (dispatch) => {
      dispatch({ type: 'GET_READ_USERS_BEGINS' });
      return axios.get(`/api/v1/message/${messageId}/user?groupId=${groupId}`)
        .then((response) => {
          dispatch({ type: 'GET_READ_USERS_SUCCESSFUL',
            payload: response.data.users });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'GET_READ_USERS_REJECTED' });
          } else {
            dispatch({ type: 'GET_READ_USERS_UNSUCCESSFUL' });
          }
        });
    };
  }

  /**
  * Request to the API to send mail for notification
  *
  * @static
  *
  * @param {Number} userId id of the user that owns the notification
  * @param {String} groupName name of the group  
  * @param {String} message message posted
  * @param {String} postedby the poster
  *
  * @returns {string} dispatched object
  *
  * @memberof UserActions
  */
  static saveInAppNotification(userId, groupName, message, postedby) {
    return (dispatch) => {
      return axios.post('/api/v1/user/notification', {
        userId,
        groupName,
        message,
        postedby
      })
        .then((response) => {
          dispatch({ type: 'SAVE_NOTIFICATION_SUCCESSFUL',
            payload: response.data.message });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'SAVE_NOTIFICATION_REJECTED',
              payload: 'Sorry, an unexpected error occurred.' });
          } else {
            dispatch({ type: 'SAVE_NOTIFICATION_UNSUCCESSFUL',
              payload: err.response.data.message });
          }
        });
    };
  }

  /**
  * Request to the API to get messages of a group
  *
  * @static
  *
  * @param {Number} userId The id of the user to get notification for
  *
  * @returns {Object} dispatch object
  *
  * @memberof MessageActions
  */
  static getNotifications(userId) {
    return (dispatch) => {
      return axios.get(`/api/v1/user/${userId}/notification`)
        .then((response) => {
          dispatch({ type: 'GET_NOTIFICATION_SUCCESSFUL',
            payload: response.data.notifications });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'GET_NOTIFICATION_REJECTED' });
          } else {
            dispatch({ type: 'GET_NOTIFICATION_UNSUCCESSFUL' });
          }
          return toastMessage(err.response.data.message);
        });
    };
  }

  /**
  * Request to the API to get messages of a group
  *
  * @static
  *
  * @param {Number} userId The id of the user to delete notification
  *
  * @returns {Object} dispatch object
  *
  * @memberof MessageActions
  */
  static deleteNotification(userId) {
    return (dispatch) => {
      return axios.delete(`/api/v1/user/${userId}/notification`)
        .then((response) => {
          dispatch({ type: 'DELETE_NOTIFICATION_SUCCESSFUL',
            payload: response.data.message });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'DELETE_NOTIFICATION_REJECTED' });
          } else {
            dispatch({ type: 'DELETE_NOTIFICATION_UNSUCCESSFUL' });
          }
          return toastMessage(err.response.data.message);
        });
    };
  }


  /**
  * Request to the API to get messages of a group
  *
  * @static
  *
  * @param {Array} currentMembers The current members of the group
  *
  * @returns {Object} dispatch object
  *
  * @memberof MessageActions
  */
  static getSearchedUsers(currentMembers) {
    return (dispatch) => {
      return axios.post('/api/v1/users', {
        currentMembers
      })
        .then((response) => {
          dispatch({ type: 'GET_SEARCHED_USERS_SUCCESSFUL',
            payload: response.data.users });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'GET_SEARCHED_USERS_REJECTED' });
          } else {
            dispatch({ type: 'GET_SEARCHED_USERS_UNSUCCESSFUL' });
          }
          return toastMessage(err.response.data.message);
        });
    };
  }
}
