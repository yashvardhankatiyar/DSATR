// topicController.js
const model = require('../Models/model');
const Topics = model.Topics;

// Get all topics
exports.getTopic = async (req, res) => {
  try {
    const topicDB = await Topics.find();
    res.status(200).json(topicDB);
  } catch (err) {
    console.log("error 4", err);
    res.status(509).json({ error: err.message });
  }
};

// Add a new topic
exports.addTopic = async (req, res) => {
  try {
    const topic = new Topics(req.body);
    const savedTopic = await topic.save();
    res.status(201).json({ savedTopic });
  } catch (err) {
    console.log("error 4", err);
    res.status(507).json({ error: err.message });
  }
};
