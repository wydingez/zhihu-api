const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const topicSchema = new Schema({
  name: { type: String, required: true },
  avatar_url: { type : String, required: false },
  introduction: { type: String, required: false, select: false }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('Topic', topicSchema);