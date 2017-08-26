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
  * @returns {Object} dispatch object
  * @memberof MessageActions
  */
  static postGroupMessage(groupID, message, priority) {
    return (dispatch) => {
      dispatch({ type: 'POST_MESSAGE_BEGINS' });
      return axios.post(`/api/v1/group/${groupID}/message`, {
        groupID,
        message,
        priority
      })
        .then((response) => {
          dispatch({ type: 'POST_MESSAGE_SUCCESSFULL', payload: response.data.Message });
        })
        .catch((err) => {
          if (err.response.data.message) {
            dispatch({ type: 'POST_MESSAGE_UNSUCCESSFULL', payload: err.response.data.message });
          } else {
            dispatch({ type: 'POST_MESSAGE_REJECTED' });
          }
        });
    };
  }

  /**
  * Request to the API to get total number of messages of a group
  *
  * @static
  * @param {Integer} groupID The id of the group to get message from
  * @param {String} token The login token
  * @returns {Object} dispatch object
  * @memberof MessageActions
  */
  static getMessages(groupID) {
    return (dispatch) => {
      dispatch({ type: 'GET_MESSAGES_BEGINS' });
      return axios.get(`/api/v1/group/${groupID}/messages`)
        .then((response) => {
          dispatch({ type: 'GET_MESSAGES_SUCCESSFUL', payload: response.data.messages });
        })
        .catch((err) => {
          if (err.response.data.message) {
            dispatch({ type: 'GET_MESSAGES_UNSUCCESSFUL', payload: err.response.data.message });
          } else {
            dispatch({ type: 'GET_MESSAGES_REJECTED' });
          }
        });
    };
  }
}
