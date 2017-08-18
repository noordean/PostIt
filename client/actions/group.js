import axios from 'axios';

/**
 * @class GroupActions
 */
export default class GroupActions {
  /**
  * Request to the API to create a group
  *
  * @static
  * @param {String} groupName The name of the group to be created
  * @param {String} description The description of the group to be created
  * @param {String} token JWToken to access the endpoint
  * @returns {Object} dispatch object
  * @memberof GroupActions
  */
  static createGroup(groupName, description, token) {
    return (dispatch) => {
      dispatch({ type: 'CREATE_GROUP_BEGINS' });
      return axios.post('/api/group', {
        groupName,
        description,
        token
      })
        .then((response) => {
          dispatch({ type: 'GROUP_CREATED', payload: response.data });
        })
        .catch((err) => {
          if (err.response.data.message) {
            dispatch({ type: 'CREATE_GROUP_UNSUCCESSFUL', payload: err.response.data.message });
          } else {
            dispatch({ type: 'CREATE_GROUP_REJECTED', payload: err });
          }
        });
    };
  }

  /**
  * Request to the API to get certain list of groups a user belongs to
  *
  * @static
  * @param {String} userId The id of the user to get groups for
  * @param {Integer} limit The number of records to get from the group table
  * @param {Integer} offset The number of records to offset from the group table
  * @param {String} token The string 
  * @returns {Object} dispatch object
  * @memberof GroupActions
  */
  static getGroups(userId, limit, offset, token) {
    return (dispatch) => {
      dispatch({ type: 'GET_GROUPS_BEGINS' });
      return axios.get(`/api/user/${userId}/${limit}/${offset}/groups`, {
        headers: {
          token
        }
      })
        .then((response) => {
          dispatch({ type: 'GOT_GROUPS', payload: response.data });
        })
        .catch((err) => {
          if (err.response.data.message) {
            dispatch({ type: 'GET_GROUPS_FAILED', payload: err.response.data });
          } else {
            dispatch({ type: 'GET_GROUPS_REJECTED', payload: err });
          }
        });
    };
  }
}
