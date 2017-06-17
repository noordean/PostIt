'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _endpointsValidation = require('../validation/endpointsValidation');

var _endpointsValidation2 = _interopRequireDefault(_endpointsValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var validationInstance = new _endpointsValidation2.default();

router.post('/api/user/signup', function (req, res) {
  res.json(validationInstance.signUp(req.body.username, req.body.password, req.body.email));
});

router.post('/api/user/signin', function (req, res) {
  res.json(validationInstance.signIn(req.body.username, req.body.password));
});

router.post('/api/group', function (req, res) {
  res.json(validationInstance.createGroup(req.body.groupname, req.body.createdby));
});

router.post('/api/group/:groupID/user', function (req, res) {
  res.json({ message: 'This is to add a user to a group with id ' + req.params.groupID });
});

router.post('/api/group/:groupID/message', function (req, res) {
  res.json({ message: 'This is to post message to a group with id ' + req.params.groupID });
});

router.get('/api/group/:groupID/messages', function (req, res) {
  res.json({ message: 'This is to retrieve messages from a group with ' + req.params.groupID });
});

router.get('/', function (req, res) {
  res.send('PostIt API running...');
});

router.get('*', function (req, res) {
  res.send('Page Not Found');
});

exports.default = router;