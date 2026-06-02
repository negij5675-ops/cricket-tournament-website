const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  type: {
    type: String,
    enum: ['team', 'player-batting', 'player-bowling'],
    required: true
  },
  entries: [{
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    position: Number,
    matches: Number,
    wins: Number,
    points: Number,
    runs: Number,
    average: Number,
    strikeRate: Number,
    wickets: Number,
    bowlingAverage: Number,
    economy: Number
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
