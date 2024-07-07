// topic.js
const express = require('express');
const route = express.Router();
const TopicController = require('../controllers/TopicData');
const authMiddleware = require('../middleware/authMiddleware');

// GET all topics
route.get('/', TopicController.getTopic);

// POST a new topic
route.post('/', TopicController.addTopic);


exports.route = route;