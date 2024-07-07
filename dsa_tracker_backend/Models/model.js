const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  link: { type: String, required: true },
  status: { type: String, required: true },
  done: { type: Boolean, required: true },
  type: { type: String, required: true },
});

const TopicSchema = new Schema({
  type : {type : String, required : true},
})

exports.Questions = mongoose.model('Questions', QuestionSchema);
exports.Topics = mongoose.model('Topics', TopicSchema);
