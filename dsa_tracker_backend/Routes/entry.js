const entry = require('../controllers/entry');
const express = require('express');
const route = express.Router();

route.post('/signup', entry.signup)
.post('/login', entry.login);

exports.route = route;