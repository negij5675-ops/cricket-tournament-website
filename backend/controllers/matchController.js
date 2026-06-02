const Match = require('../models/Match');
const Team = require('../models/Team');
const Player = require('../models/Player');

// Get All Matches
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate('tournament', 'name status')
      .populate('team1', 'name shortName logo')
      .populate('team2', 'name shortName logo')
      .populate('result.winner', 'name shortName')
      .sort({ matchDate: -1 });

    res.status(200).json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Match By ID
exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('tournament', 'name format totalOvers')
      .populate('team1', 'name shortName logo')
      .populate('team2', 'name shortName logo')
      .populate('tossWinner', 'name shortName')
      .populate('batFirst', 'name shortName')
      .populate('result.winner', 'name shortName')
      .populate('manOfTheMatch', 'userId jerseyNumber');

    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }

    res.status(200).json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Match
exports.createMatch = async (req, res) => {
  try {
    const { tournament, matchNumber, team1, team2, matchDate, venue } = req.body;

    const match = await Match.create({
      tournament,
      matchNumber,
      team1,
      team2,
      matchDate,
      venue,
      status: 'scheduled'
    });

    res.status(201).json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Match
exports.updateMatch = async (req, res) => {
  try {
    let match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }

    match = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Start Match
exports.startMatch = async (req, res) => {
  try {
    const { tossWinner, batFirst } = req.body;

    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { status: 'live', tossWinner, batFirst },
      { new: true }
    ).populate('team1 team2 tossWinner batFirst');

    res.status(200).json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// End Match
exports.endMatch = async (req, res) => {
  try {
    const { winner, margin, description } = req.body;

    // Update match status
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      {
        status: 'completed',
        result: { winner, margin, description }
      },
      { new: true }
    ).populate('team1 team2 result.winner');

    // Update team statistics
    if (winner) {
      await Team.findByIdAndUpdate(winner, { $inc: { wins: 1, totalMatches: 1 } });
      
      const loserTeam = match.team1._id.toString() === winner.toString() ? match.team2._id : match.team1._id;
      await Team.findByIdAndUpdate(loserTeam, { $inc: { losses: 1, totalMatches: 1 } });
    }

    res.status(200).json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Match
exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);

    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }

    res.status(200).json({ success: true, message: 'Match deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Score
exports.updateScore = async (req, res) => {
  try {
    const { inningIndex, runs, wickets, overs, balls } = req.body;

    const match = await Match.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          [`innings.${inningIndex}.runs`]: runs,
          [`innings.${inningIndex}.wickets`]: wickets,
          [`innings.${inningIndex}.overs`]: overs,
          [`innings.${inningIndex}.balls`]: balls
        }
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Record Wicket
exports.recordWicket = async (req, res) => {
  try {
    const { inningIndex, ballNumber, bowlerId, batsmanId, wicketType } = req.body;

    const match = await Match.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          [`innings.${inningIndex}.balls`]: {
            ballNumber,
            bowler: bowlerId,
            batsman: batsmanId,
            isWicket: true,
            wicketType
          }
        }
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Set Man of the Match
exports.setManOfTheMatch = async (req, res) => {
  try {
    const { playerId } = req.body;

    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { manOfTheMatch: playerId },
      { new: true }
    ).populate('manOfTheMatch', 'userId jerseyNumber');

    res.status(200).json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Match Scorecard
exports.getMatchScorecard = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('team1', 'name shortName')
      .populate('team2', 'name shortName')
      .populate('innings.balls.bowler', 'userId jerseyNumber')
      .populate('innings.balls.batsman', 'userId jerseyNumber');

    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }

    res.status(200).json({ success: true, data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Match Statistics
exports.getMatchStatistics = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('team1', 'name')
      .populate('team2', 'name');

    if (!match) {
      return res.status(404).json({ success: false, message: 'Match not found' });
    }

    const stats = {
      match: `${match.team1.name} vs ${match.team2.name}`,
      matchDate: match.matchDate,
      status: match.status,
      venue: match.venue,
      innings: match.innings.map(inning => ({
        team: inning.team,
        runs: inning.runs,
        wickets: inning.wickets,
        overs: inning.overs
      }))
    };

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
