const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title']
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['tournament', 'team', 'player', 'general'],
    default: 'general'
  },
  featuredImage: String,
  relatedTournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament'
  },
  relatedTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  relatedPlayer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  views: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  publishedAt: Date
});

module.exports = mongoose.model('News', newsSchema);
