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
  static createGroup(groupName, description) {
    return (dispatch) => {
      dispatch({ type: 'CREATE_GROUP_BEGINS' });
      return axios.post('/api/v1/group', {
        groupName,
        description
      })
        .then((response) => {
          dispatch({ type: 'CREATE_GROUP_SUCCESSFUL', groups: response.data.group });
        })
        .catch((err) => {
          if (err.response.data.message) {
            dispatch({ type: 'CREATE_GROUP_UNSUCCESSFUL', errorMessage: err.response.data.message });
          } else {
            dispatch({ type: 'CREATE_GROUP_REJECTED' });
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
  static getGroups(userId, limit, offset) {
    return (dispatch) => {
      dispatch({ type: 'GET_GROUPS_BEGINS' });
      return axios.get(`/api/v1/user/${userId}/groups?limit=${limit}&offset=${offset}`)
        .then((response) => {
          dispatch({ type: 'GET_GROUPS_SUCCESSFUL', groups: response.data.groups.rows, pageCount: response.data.groups.count });
        })
        .catch((err) => {
          if (err.response.data.message) {
            dispatch({ type: 'GET_GROUPS_UNSUCCESSFUL', errorMessage: err.response.data.message });
          } else {
            dispatch({ type: 'GET_GROUPS_REJECTED' });
          }
        });
    };
  }
}