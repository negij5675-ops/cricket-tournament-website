const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide tournament name']
  },
  description: {
    type: String,
    required: true
  },
  format: {
    type: String,
    enum: ['T20', 'ODI', '10-Over', '5-Over', 'Custom'],
    required: true
  },
  totalOvers: {
    type: Number,
    required: true
  },
  location: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rules: String,
  prizePool: String,
  bannerImage: String,
  maxTeams: {
    type: Number,
    default: 8
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

module.exports = mongoose.model('Tournament', tournamentSchema);
