
/**
 * @description: validates the supplied req.body for each route
 * 
 * @class Validate
 */
export default class Validate {
/**
 * @description: validates the group details
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * 
 * @return {Object} response containing the validation status
 */
  static checkGroupName(req, res, next) {
    const { groupName, description } = req.body;
    const parameters = { groupName, description };
    const validationErrors = [];
    const reqBodyKeys = Object.keys(req.body);
    Object.keys(parameters).forEach((params) => {
      if (reqBodyKeys.indexOf(params) === -1) {
        validationErrors.push(params);
      }
    });
    if (validationErrors.length > 0) {
      return res.status(400).json(
        { message: `${validationErrors[0]} must be supplied` });
    } else if (groupName.trim().length === 0) {
      return res.status(400).json({ message: 'groupName cannot be empty' });
    }
    return next();
  }

  /**
 * @description: validates both groupId and userId
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * 
 * @return {Object} response containing the validation status
 */
  static checkIds(req, res, next) {
    const [groupId, userId] = [req.params.groupId, req.body.userId];
    if (groupId === undefined) {
      return res.status(400).json({ message: 'groupId must be supplied' });
    } else if (userId === undefined) {
      return res.status(400).json({ message: 'userId\'s must be supplied' });
    } else if (groupId.trim().length === 0) {
      return res.status(400).json({ message: 'groupId cannot be empty' });
    } else if (userId.length === 0) {
      return res.status(400).json({ message: 'userId\'s cannot be empty' });
    } else if (isNaN(groupId)) {
      return res.status(400).json(
        { message: 'The supplied id\'s must be integers' });
    } else if (!Array.isArray(userId)) {
      return res.status(400).json(
        { message: 'The userId\'s must be an array' });
    }
    return next();
  }

  /**
 * @description: validates the groupId
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * 
 * @return {Object} response containing the validation status
 */
  static checkGroupId(req, res, next) {
    const groupId = req.params.groupId;
    if (groupId === undefined) {
      return res.status(400).json({ message: 'groupId must be supplied' });
    } else if (groupId.trim().length === 0) {
      return res.status(400).json({ message: 'groupId cannot be empty' });
    } else if (isNaN(groupId)) {
      return res.status(400).json(
        { message: 'The supplied id must be integer' });
    }
    return next();
  }

  /**
 * @description: validates the userId
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * 
 * @return {Object} response containing the validation status
 */
  static checkUserId(req, res, next) {
    const userId = req.params.userID;
    if (userId === undefined) {
      return res.status(400).json({ message: 'userId must be supplied' });
    } else if (userId.trim().length === 0) {
      return res.status(400).json({ message: 'userId cannot be empty' });
    } else if (isNaN(userId)) {
      return res.status(400).json(
        { message: 'The supplied id must be integer' });
    }
    return next();
  }

  /**
 * @description: validates message details
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * 
 * @return {Object} response containing the validation status
 */
  static checkMessage(req, res, next) {
    const { content, priority } = req.body;
    const [groupId, expectedPriority] = [req.params.groupId,
      ['Normal', 'Urgent', 'Critical']];

    const parameters = { content, priority };
    const validationErrors = [];
    const reqBodyKeys = Object.keys(req.body);
    Object.keys(parameters).forEach((params) => {
      if (reqBodyKeys.indexOf(params) === -1) {
        validationErrors.push(params);
      }
    });
    if (validationErrors.length > 0) {
      return res.status(400).json(
        { message: `${validationErrors[0]} must be supplied` });
    } else if (expectedPriority.indexOf(priority) === -1) {
      return res.status(400).json(
        { message: 'Priority can either be Normal, Urgent or Critical' });
    } else if (groupId.trim().length === 0) {
      return res.status(400).json({ message: 'groupId cannot be empty' });
    } else if (content.trim().length === 0) {
      return res.status(400).json({ message: 'message cannot be empty' });
    } else if (isNaN(groupId)) {
      return res.status(400).json(
        { message: 'The supplied id must be an integer' });
    }
    return next();
  }

  /**
 * @description: validates messageId
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * 
 * @return {Object} response containing the validation status
 */
  static checkMessageId(req, res, next) {
    const messageId = req.params.messageId;
    if (messageId === undefined) {
      return res.status(400).json({ message: 'messageId must be supplied' });
    } else if (messageId.trim().length === 0) {
      return res.status(400).json({ message: 'messageId cannot be empty' });
    } else if (isNaN(messageId)) {
      return res.status(400).json(
        { message: 'The supplied id must be integer' });
    }
    return next();
  }

  /**
 * @description: validates user's password
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * 
 * @return {Object} response containing the validation status
 */
  static checkPassword(req, res, next) {
    const password = req.body.password;
    if (password === undefined) {
      return res.status(400).json({ message: 'Password must be supplied' });
    } else if (
      /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{5,12}$/.test(password) === false) {
      return res.status(400).json({
        message: 'Password must be alphanumeric and should contain 5-12 characters'
      });
    }
    return next();
  }

  /**
 * @description: validates both username and password
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * 
 * @return {Object} response containing the validation status
 */
  static checkUser(req, res, next) {
    const { username, password } = req.body;
    const parameters = { username, password };
    const validationErrors = [];
    const reqBodyKeys = Object.keys(req.body);
    Object.keys(parameters).forEach((params) => {
      if (reqBodyKeys.indexOf(params) === -1) {
        validationErrors.push(params);
      }
    });
    if (validationErrors.length > 0) {
      return res.status(400).json(
        { message: `${validationErrors[0]} must be supplied` });
    }
    return next();
  }

  /**
 * @description: checks for internal server error from services
 * 
 * @param {Object} dbResponse response from services
 * 
 * @return {Object} response object
 */
  static hasInternalServerError(dbResponse) {
    if (dbResponse instanceof Object && !Array.isArray(dbResponse)
      && dbResponse.dataValues === undefined) {
      return true;
    }
  }

  /**
 * @description: sends response for internal server error
 * 
 * @return {Object} response object
 */
  static sendInternalServerError() {
    return ({ message: 'Sorry, unexpected error occurred' });
  }
}