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
  * @param {Array} groupMembers The members of the group to be created
  * @param {String} token JWToken to access the endpoint
  * @returns {Object} dispatch object
  * @memberof GroupActions
  */
  static createGroup(groupName, description, groupMembers, token) {
    return (dispatch) => {
      dispatch({ type: 'CREATE_GROUP_BEGINS' });
      return axios.post('https://postit-api.herokuapp.com/api/group', {
        groupName,
        description,
        groupMembers,
        token
      })
        .then((response) => {
          dispatch({ type: 'GROUP_CREATED', payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: 'CREATE_GROUP_REJECTED', payload: err });
        });
    };
  }

  /**
  * Request to the API to get certain list of groups a user belongs to
  *
  * @static
  * @param {String} user The name of user to get groups for
  * @param {Integer} offset The number of records to offset from the group table
  * @param {Integer} limit The number of records to get from the group table
  * @returns {Object} dispatch object
  * @memberof GroupActions
  */
  static getGroups(user, offset, limit) {
    return (dispatch) => {
      dispatch({ type: 'GET_GROUPS_BEGINS' });
      return axios.get(`https://postit-api.herokuapp.com/api/groups/${user}/${offset}/${limit}`)
        .then((response) => {
          dispatch({ type: 'GOT_GROUPS', payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: 'GET_GROUPS_REJECTED', payload: err });
        });
    };
  }

  /**
  * Request to the API to gt total number of groups a user belongs to
  *
  * @static
  * @param {String} user The name of user to get groups for
  * @returns {Object} dispatch object
  * @memberof GroupActions
  */
  static getTotalGroups(user) {
    // dispatch({ type: 'GET_ALL_GROUPS_BEGINS' });
    return dispatch =>
      axios.get(`https://postit-api.herokuapp.com/api/groups/${user}`)
        .then((response) => {
          dispatch({ type: 'GOT_ALL_GROUPS', payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: 'GET_ALL_GROUPS_REJECTED', payload: err });
        });
  }
}
