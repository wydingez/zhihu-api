const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const questionsSchema = new Schema({
  title: { type: String, required: true },
  avatar_url: { type : String, required: false },
  description: { type: String, required: false },
  questioner: { type: Schema.Types.ObjectId, select: false, ref: 'User', required: true },
  topics: {
    type: [{ type: Schema.Types.ObjectId, select: false, ref: 'Topic', required: true }]
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('Question', questionsSchema);