'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var controller = new _controllers2.default();

router.post('/api/user/signup', controller.signUp);
router.post('/api/user/signin', controller.signIn);
router.post('/api/group', controller.createGroup);
router.post('/api/group/:groupID/user', controller.addUserToGroup);
router.post('/api/group/:groupID/message', controller.postMessageToGroup);
router.get('/api/group/:groupID/messages', controller.getMessageFromGroup);

router.get('/', function (req, res) {
  res.send('PostIt API running...');
});

router.get('*', function (req, res) {
  res.send('Page Not Found');
});

exports.default = router;