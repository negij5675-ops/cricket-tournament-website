const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  matchNumber: Number,
  team1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  team2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  matchDate: {
    type: Date,
    required: true
  },
  venue: String,
  status: {
    type: String,
    enum: ['scheduled', 'live', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  tossWinner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  batFirst: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  innings: [{
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },
    runs: Number,
    wickets: Number,
    overs: Number,
    balls: [{
      ballNumber: Number,
      bowler: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
      batsman: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
      runs: Number,
      isWicket: Boolean,
      wicketType: String
    }]
  }],
  result: {
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    margin: String,
    description: String
  },
  manOfTheMatch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  videos: [String],
  photos: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Match', matchSchema);
