const Question = require("../controllers/questionData");
const express = require('express');
const route = express.Router();



route.get('/', Question.getQuestion)
.patch('/:id', Question.attemptQues)
.post('/addQuestion', Question.addQuestion)

exports.route = route;
