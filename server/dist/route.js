'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/api/user/signup', function (req, res) {
  res.json({ message: 'This is for signup' });
});

router.post('/api/user/signup', function (req, res) {
  res.json({ message: 'This is for signup' });
});

router.post('/api/user/signin', function (req, res) {
  res.json({ message: 'This is for signin' });
});

router.post('/api/group', function (req, res) {
  res.json({ message: 'This is to create group' });
});

router.post('/api/group/group-id/user', function (req, res) {
  res.json({ message: 'This is to add a user to a group' });
});

router.post('/api/group/group-id/message', function (req, res) {
  res.json({ message: 'This is to post message to a group' });
});

router.get('/api/group/group-id/messages', function (req, res) {
  res.json({ message: 'This is to retrieve messages from a group' });
});

router.get('/', function (req, res) {
  res.send('PostIt API running...');
});

router.get('*', function (req, res) {
  res.send('Page Not Found');
});

exports.default = router;