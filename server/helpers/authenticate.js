import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.jwtSecret;
/**
 * @description: protects the routes with jwt
 * 
 * @class Authenticate
 */
export default class Authenticate {
/**
 * @description: generate a login token
 * 
 * @param {Object} payload payload to generate token
 * 
 * @return {String} the generated token
 */
  static generateToken(payload) {
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: '720h'
    });
    return token;
  }

  /**
 * @description: verifies the supplied token
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next callback function
 * 
 * @return {Object} response containing user's access status
 */
  static verifyToken(req, res, next) {
    const token = req.headers.token || req.body.token;
    if (token) {
      jwt.verify(token, jwtSecret, (err, decode) => {
        if (decode === undefined) {
          return res.status(401).json({ message:
            'Access denied!. Kindly login' });
        }
        return next();
      });
    } else {
      return res.status(401).json(
        { message: 'Your login token must be provided' });
    }
  }
}
