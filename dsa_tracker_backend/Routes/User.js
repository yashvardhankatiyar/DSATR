const User = require("../controllers/User");
const express = require('express');
const route = express.Router();



route.get('/info', User.getUser)
.patch('/updateAttemptedQuestions', User.attemptingPatch)

exports.route = route;
