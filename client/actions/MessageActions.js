import axios from 'axios';

/**
 * @class MessageActions
 */
export default class MessageActions {
  /**
  * Request to the API to post message to a group
  *
  * @static

  * @param {Integer} groupID The id of the group to post message to
  * @param {String} message The content of the message to be posted
  * @param {String} priority The content of the message to be posted
  * @param {String} token JWToken to access the endpoint
  *
  * @returns {Object} dispatch object
  *
  * @memberof MessageActions
  */
  static postMessage(groupID, message, priority) {
    return (dispatch) => {
      dispatch({ type: 'POST_MESSAGE_BEGINS' });
      return axios.post(`/api/v1/group/${groupID}/message`, {
        groupID,
        message,
        priority
      })
        .then((response) => {
          dispatch({ type: 'POST_MESSAGE_SUCCESSFUL',
            payload: response.data.Message });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'POST_MESSAGE_REJECTED',
              payload: 'Sorry, an unexpected error occurred' });
          } else {
            dispatch({ type: 'POST_MESSAGE_UNSUCCESSFUL',
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
  * @param {Integer} groupID The id of the group to get message from
  * @param {Integer} userId The id of the user to get message for
  * @param {String} token The login token
  *
  * @returns {Object} dispatch object
  *
  * @memberof MessageActions
  */
  static getMessages(groupID, userId) {
    return (dispatch) => {
      dispatch({ type: 'GET_MESSAGES_BEGINS' });
      return axios.get(`/api/v1/group/${groupID}/messages?userId=${userId}`)
        .then((response) => {
          dispatch({ type: 'GET_MESSAGES_SUCCESSFUL',
            payload: response.data.messages });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'GET_MESSAGES_REJECTED',
              payload: 'Sorry, an unexpected error occurred' });
          } else {
            dispatch({ type: 'GET_MESSAGES_UNSUCCESSFUL',
              payload: err.response.data.message });
          }
        });
    };
  }

  /**
  * Request to the API to archive read messages
  *
  * @static
  *
  * @param {Integer}  groupId id of the group to get message from
  * @param {Integer}  userId id of the user that read the messages
  * @param {String} messageIds An array of messages read
  *
  * @returns {Object} dispatch object
  *
  * @memberof MessageActions
  */
  static archiveReadMessages(groupId, userId, messageIds) {
    return (dispatch) => {
      dispatch({ type: 'ARCHIVE_MESSAGES_BEGINS' });
      return axios.post(`/api/v1/group/${groupId}/message/archive`, {
        userId,
        messageIds
      })
        .then((response) => {
          dispatch({ type: 'ARCHIVE_MESSAGES_SUCCESSFUL',
            message: response.data.message });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'ARCHIVE_MESSAGES_FAILED_UNEXPECTEDLY',
              message: 'Sorry, an unexpected error occurred.' });
          } else {
            dispatch({ type: 'ARCHIVE_MESSAGES_UNSUCCESSFUL',
              message: err.response.data.message });
          }
        });
    };
  }

  /**
  * Request to the API to get messages of a group
  *
  * @static
  *
  * @param {Integer} groupID The id of the group to get message from
  * @param {Integer} userId The id of the user to get message for
  * @param {String} token The login token
  *
  * @returns {Object} dispatch object
  *
  * @memberof MessageActions
  */
  static getArchivedMessages(groupID, userId) {
    return (dispatch) => {
      dispatch({ type: 'GET_ARCHIVE_MESSAGES_BEGINS' });
      return axios.get(
        `/api/v1/group/${groupID}/message/archive?userId=${userId}`)
        .then((response) => {
          dispatch({ type: 'GET_ARCHIVE_MESSAGES_SUCCESSFUL',
            payload: response.data.messages });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            dispatch({ type: 'GET_ARCHIVE_MESSAGES_REJECTED',
              payload: 'Sorry, an unexpected error occurred.' });
          } else {
            dispatch({ type: 'GET_ARCHIVE_MESSAGES_UNSUCCESSFUL',
              payload: err.response.data.message });
          }
        });
    };
  }
}
