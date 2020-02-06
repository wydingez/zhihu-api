const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const answersSchema = new Schema({
  content: { type: String, required: true },
  answerer: { type: Schema.Types.ObjectId, select: false, ref: 'User', required: true },
  questionId: { type: String, required: true },
  voteCount: { type: Number, required: true, default: 0 }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('Answer', answersSchema);