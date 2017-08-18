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
  static postGroupMessage(groupID, message, priority, token) {
    return (dispatch) => {
      dispatch({ type: 'POST_MESSAGE_BEGINS' });
      axios.post(`/api/group/${groupID}/message`, {
        groupID,
        message,
        priority,
        token
      })
        .then((response) => {
          dispatch({ type: 'MESSAGE_POSTED', payload: response.data });
        })
        .catch((err) => {
          if (err.response.data.message) {
            dispatch({ type: 'POST_MESSAGE_FAILED', payload: err.response.data });
          } else {
            dispatch({ type: 'POST_MESSAGE_REJECTED', payload: err });
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
  static getMessages(groupID, token) {
    return (dispatch) => {
      dispatch({ type: 'GET_ALL_MESSAGES_BEGINS' });
      axios.get(`/api/group/${groupID}/messages`, {
        headers: {
          token
        }
      })
        .then((response) => {
          dispatch({ type: 'GOT_ALL_MESSAGES', payload: response.data });
        })
        .catch((err) => {
          if (err.response.data.message) {
            dispatch({ type: 'GET_ALL_MESSAGES_FAILED', payload: err.response.data.message });
          } else {
            dispatch({ type: 'GET_ALL_MESSAGES_REJECTED', payload: err });
          }
        });
    };
  }
}
