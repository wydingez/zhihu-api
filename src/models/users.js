const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String , required: true },
  password: { type: String, required: true, select: false },
  age: { type: Number, required: false, default: 0 },
  avatar_url: { type: String },
  gender: { type: String, enum: [ 'male', 'female' ], default: 'male', required: true },
  headline: { type: String },
  locations: { 
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    select: false
  },
  bussiness: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    select: false
  },
  employments: { 
    type: [{
      company: { type: Schema.Types.ObjectId, ref: 'Topic' },
      job: { type: Schema.Types.ObjectId, ref: 'Topic' }
    }],
    select: false
  },
  educations: {
    type: [{
      school: { type: Schema.Types.ObjectId, ref: 'Topic' },
      major: { type: Schema.Types.ObjectId, ref: 'Topic' },
      diploma: { type: Number, enmu: [1, 2, 3, 4, 5]},
      entrance_year: { type: Number },
      graduation_year: { type: Number }
    }],
    select: false
  },
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    select: false
  },
  followingTopics: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Topic'}],
    select: false
  },
  // 赞果的答案
  likingAnswers: { 
    type: [{ type: Schema.Types.ObjectId, ref: 'Answer'}],
    select: false
  },
  // 踩果的答案
  dislikingAnswers: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Answer'}],
    select: false
  },
  // 收藏的答案
  collectingAnswers: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Answer'}],
    select: false
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('User', userSchema);