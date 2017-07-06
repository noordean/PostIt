'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
// connect to an online postgreSQL database
var sequelize = new _sequelize2.default(process.env.DATABASE_URL, { query: { raw: true } });

sequelize.authenticate().then(function () {
  console.log('connected');
}).catch(function (err) {
  console.log('errorrr');
});

exports.default = sequelize;