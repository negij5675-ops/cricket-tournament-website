const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jerseyNumber: Number,
  role: {
    type: String,
    enum: ['batsman', 'bowler', 'all-rounder', 'wicket-keeper'],
    required: true
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  battingHand: {
    type: String,
    enum: ['right', 'left']
  },
  bowlingHand: {
    type: String,
    enum: ['right', 'left']
  },
  bowlingStyle: String,
  statistics: {
    matches: {
      type: Number,
      default: 0
    },
    innings: {
      type: Number,
      default: 0
    },
    runs: {
      type: Number,
      default: 0
    },
    highestScore: {
      type: Number,
      default: 0
    },
    average: {
      type: Number,
      default: 0
    },
    strikeRate: {
      type: Number,
      default: 0
    },
    wickets: {
      type: Number,
      default: 0
    },
    bowlingAverage: {
      type: Number,
      default: 0
    },
    economy: {
      type: Number,
      default: 0
    },
    centuries: {
      type: Number,
      default: 0
    },
    halfCenturies: {
      type: Number,
      default: 0
    },
    catches: {
      type: Number,
      default: 0
    },
    stumpings: {
      type: Number,
      default: 0
    }
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

module.exports = mongoose.model('Player', playerSchema);
