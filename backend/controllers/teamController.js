const Team = require('../models/Team');
const Player = require('../models/Player');

// Get All Teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('manager', 'firstName lastName email')
      .populate('players', 'userId jerseyNumber role')
      .populate('captainId', 'userId jerseyNumber')
      .populate('tournaments', 'name startDate endDate');

    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Team By ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('manager', 'firstName lastName email phone')
      .populate('players', 'userId jerseyNumber role battingHand bowlingStyle')
      .populate('captainId', 'userId jerseyNumber')
      .populate('vice_captainId', 'userId jerseyNumber')
      .populate('tournaments', 'name startDate endDate status');

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Team
exports.createTeam = async (req, res) => {
  try {
    const { name, shortName, logo, description, city } = req.body;

    const team = await Team.create({
      name,
      shortName,
      logo,
      description,
      city,
      manager: req.user.id
    });

    res.status(201).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Team
exports.updateTeam = async (req, res) => {
  try {
    let team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Team
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    res.status(200).json({ success: true, message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Team Players
exports.getTeamPlayers = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('players');

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    const players = await Player.find({ _id: { $in: team.players } })
      .populate('userId', 'firstName lastName email phone profileImage');

    res.status(200).json({ success: true, data: players });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Player to Team
exports.addPlayerToTeam = async (req, res) => {
  try {
    const { playerId } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $push: { players: playerId } },
      { new: true }
    ).populate('players');

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Player from Team
exports.removePlayerFromTeam = async (req, res) => {
  try {
    const { playerId } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $pull: { players: playerId } },
      { new: true }
    ).populate('players');

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Set Team Captain
exports.setTeamCaptain = async (req, res) => {
  try {
    const { captainId, vice_captainId } = req.body;

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { captainId, vice_captainId },
      { new: true }
    ).populate('captainId vice_captainId', 'userId jerseyNumber');

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Team Statistics
exports.getTeamStatistics = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found' });
    }

    const stats = {
      team: team.name,
      totalMatches: team.totalMatches,
      wins: team.wins,
      losses: team.losses,
      winPercentage: team.totalMatches > 0 ? ((team.wins / team.totalMatches) * 100).toFixed(2) : 0,
      playersCount: team.players.length
    };

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
