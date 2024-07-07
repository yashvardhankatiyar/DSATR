const express = require('express');
const mongoose = require('mongoose');
const model = require('../Models/model');
const Questions = model.Questions;

exports.getQuestion = async (req, res) => {
  try {
    const questionDB = await Questions.find();
    res.status(200).json(questionDB);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.attemptQues = async (req, res) => {
  const id = req.params.id;

  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const question = await Questions.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    const newStatus = question.status === 'Incomplete' ? 'complete' : 'Incomplete';
    const edited = await Questions.findOneAndUpdate({ _id: id }, { status: newStatus }, { new: true });
    res.status(200).json(edited);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const question = new Questions(req.body);

    const savedQuestion = await question.save();
    res.status(201).json({ savedQuestion });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
