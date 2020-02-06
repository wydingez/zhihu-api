const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const commentsSchema = new Schema({
  content: { type: String, required: true },
  commentator: { type: Schema.Types.ObjectId, select: false, ref: 'User', required: true },
  questionId: { type: String, required: true },
  answerId: { type: String, required: true },
  rootCommentId: { type: String },
  replyTo: { type: Schema.Types.ObjectId, select: false, ref: 'User', required: false }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('Comment', commentsSchema);