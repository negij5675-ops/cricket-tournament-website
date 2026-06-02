const Player = require('../models/Player');
const User = require('../models/User');

// Get All Players
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find()
      .populate('userId', 'firstName lastName email phone profileImage')
      .populate('team', 'name shortName logo');

    res.status(200).json({ success: true, data: players });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Player By ID
exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
      .populate('userId', 'firstName lastName email phone profileImage bio city')
      .populate('team', 'name shortName logo');

    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }

    res.status(200).json({ success: true, data: player });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Player
exports.createPlayer = async (req, res) => {
  try {
    const { jerseyNumber, role, battingHand, bowlingHand, bowlingStyle, team } = req.body;

    const player = await Player.create({
      userId: req.user.id,
      jerseyNumber,
      role,
      battingHand,
      bowlingHand,
      bowlingStyle,
      team
    });

    res.status(201).json({ success: true, data: player });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Player
exports.updatePlayer = async (req, res) => {
  try {
    let player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }

    player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: player });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Player
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);

    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }

    res.status(200).json({ success: true, message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Player Statistics
exports.getPlayerStatistics = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id)
      .populate('userId', 'firstName lastName');

    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        player: `${player.userId.firstName} ${player.userId.lastName}`,
        role: player.role,
        statistics: player.statistics
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Player Matches
exports.getPlayerMatches = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }

    // Find matches where this player participated
    const Match = require('../models/Match');
    const matches = await Match.find({
      $or: [
        { 'innings.balls.batsman': req.params.id },
        { 'innings.balls.bowler': req.params.id }
      ]
    }).populate('team1', 'name').populate('team2', 'name');

    res.status(200).json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
