const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  },
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament'
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  mediaType: {
    type: String,
    enum: ['photo', 'video'],
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  },
  thumbnail: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Gallery', gallerySchema);
