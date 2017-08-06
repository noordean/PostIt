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
  * @param {String} token JWToken to access the endpoint
  * @returns {Object} dispatch object
  * @memberof MessageActions
  */
  static postGroupMessage(groupID, message, token) {
    return (dispatch) => {
      dispatch({ type: 'POST_MESSAGE_BEGINS' });
      axios.post(`https://postit-api.herokuapp.com/api/group/${groupID}/message`, {
        groupID,
        message,
        token
      })
        .then((response) => {
          dispatch({ type: 'MESSAGE_POSTED', payload: response.data });
          window.location.reload();
        })
        .catch((err) => {
          dispatch({ type: 'POST_MESSAGE_REJECTED', payload: err });
        });
    };
  }

  /**
  * Request to the API to get messages from of a group
  *
  * @static
  * @param {Integer} groupID The id of the group to get message from
  * @param {String} token JWToken to access the endpoint
  * @param {Integer} offset The number of records to offset from the message table
  * @param {Integer} limit The number of records to get from the message table
  * @returns {Object} dispatch object
  * @memberof MessageActions
  */
  static getMessages(groupID, token, offset, limit) {
    return (dispatch) => {
      dispatch({ type: 'GET_MESSAGES_BEGINS' });
      axios.get(`https://postit-api.herokuapp.com/api/group/${groupID}/messages/${offset}/${limit}`, {
        headers: {
          token
        }
      })
        .then((response) => {
          dispatch({ type: 'GOT_MESSAGES', payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: 'GET_MESSAGES_REJECTED', payload: err });
        });
    };
  }

  /**
  * Request to the API to get total number of messages of a group
  *
  * @static
  * @param {Integer} groupID The id of the group to get message from
  * @returns {Object} dispatch object
  * @memberof MessageActions
  */
  static getTotalMessages(groupID) {
    return (dispatch) => {
      dispatch({ type: 'GET_ALL_MESSAGES_BEGINS' });
      axios.get(`https://postit-api.herokuapp.com/api/groups/${groupID}/messages`)
        .then((response) => {
          dispatch({ type: 'GOT_ALL_MESSAGES', payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: 'GET_ALL_MESSAGES_REJECTED', payload: err });
        });
    };
  }
}
