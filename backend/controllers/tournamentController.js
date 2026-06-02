const Tournament = require('../models/Tournament');
const Match = require('../models/Match');
const Leaderboard = require('../models/Leaderboard');

// Get All Tournaments
exports.getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find()
      .populate('admin', 'firstName lastName email')
      .populate('teams', 'name shortName logo');

    res.status(200).json({ success: true, data: tournaments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Tournament By ID
exports.getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('admin', 'firstName lastName email')
      .populate('teams', 'name shortName logo wins losses totalMatches');

    if (!tournament) {
      return res.status(404).json({ success: false, message: 'Tournament not found' });
    }

    res.status(200).json({ success: true, data: tournament });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Tournament
exports.createTournament = async (req, res) => {
  try {
    const { name, description, format, totalOvers, location, startDate, endDate, rules, prizePool, bannerImage, maxTeams } = req.body;

    const tournament = await Tournament.create({
      name,
      description,
      format,
      totalOvers,
      location,
      startDate,
      endDate,
      rules,
      prizePool,
      bannerImage,
      maxTeams,
      admin: req.user.id
    });

    res.status(201).json({ success: true, data: tournament });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Tournament
exports.updateTournament = async (req, res) => {
  try {
    let tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({ success: false, message: 'Tournament not found' });
    }

    tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: tournament });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Tournament
exports.deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);

    if (!tournament) {
      return res.status(404).json({ success: false, message: 'Tournament not found' });
    }

    res.status(200).json({ success: true, message: 'Tournament deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Team to Tournament
exports.addTeamToTournament = async (req, res) => {
  try {
    const { teamId } = req.body;
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      { $push: { teams: teamId } },
      { new: true }
    ).populate('teams', 'name shortName logo');

    res.status(200).json({ success: true, data: tournament });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Team from Tournament
exports.removeTeamFromTournament = async (req, res) => {
  try {
    const { teamId } = req.body;
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      { $pull: { teams: teamId } },
      { new: true }
    ).populate('teams', 'name shortName logo');

    res.status(200).json({ success: true, data: tournament });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Tournament Matches
exports.getTournamentMatches = async (req, res) => {
  try {
    const matches = await Match.find({ tournament: req.params.id })
      .populate('team1', 'name shortName logo')
      .populate('team2', 'name shortName logo')
      .sort({ matchDate: 1 });

    res.status(200).json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Tournament Leaderboard
exports.getTournamentLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.findOne({
      tournament: req.params.id,
      type: 'team'
    }).populate('entries.team', 'name shortName logo');

    res.status(200).json({ success: true, data: leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Start Tournament
exports.startTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      { status: 'ongoing' },
      { new: true }
    );

    res.status(200).json({ success: true, data: tournament });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// End Tournament
exports.endTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    );

    res.status(200).json({ success: true, data: tournament });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
