const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide team name']
  },
  shortName: {
    type: String,
    required: true,
    uppercase: true
  },
  logo: String,
  description: String,
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  captainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  vice_captainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  city: String,
  tournaments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament'
  }],
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  totalMatches: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Team', teamSchema);
