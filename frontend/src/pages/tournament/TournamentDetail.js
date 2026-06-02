import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tournamentService from '../../services/tournamentService';
import matchService from '../../services/matchService';
import { FaCalendar, FaMapMarkerAlt, FaTrophy, FaUsers } from 'react-icons/fa';

const TournamentDetail = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [matches, setMatches] = useState([]);
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchTournamentDetails();
    fetchMatches();
    fetchLeaderboard();
  }, [id]);

  const fetchTournamentDetails = async () => {
    try {
      const response = await tournamentService.getTournamentById(id);
      setTournament(response.data.data);
    } catch (error) {
      console.error('Failed to fetch tournament details');
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    try {
      const response = await tournamentService.getTournamentMatches(id);
      setMatches(response.data.data);
    } catch (error) {
      console.error('Failed to fetch matches');
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await tournamentService.getTournamentLeaderboard(id);
      setLeaderboard(response.data.data);
    } catch (error) {
      console.error('Failed to fetch leaderboard');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!tournament) return <div className="text-center py-12">Tournament not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        {tournament.bannerImage && (
          <img src={tournament.bannerImage} alt={tournament.name} className="w-full h-96 object-cover rounded-lg mb-8" />
        )}

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{tournament.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{tournament.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <FaTrophy className="text-yellow-500 text-2xl" />
              <div>
                <p className="text-gray-600 text-sm">Format</p>
                <p className="font-bold text-lg">{tournament.format} ({tournament.totalOvers} Overs)</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-red-500 text-2xl" />
              <div>
                <p className="text-gray-600 text-sm">Location</p>
                <p className="font-bold text-lg">{tournament.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaCalendar className="text-blue-500 text-2xl" />
              <div>
                <p className="text-gray-600 text-sm">Start Date</p>
                <p className="font-bold text-lg">{new Date(tournament.startDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaUsers className="text-green-500 text-2xl" />
              <div>
                <p className="text-gray-600 text-sm">Teams</p>
                <p className="font-bold text-lg">{tournament.teams?.length || 0}/{tournament.maxTeams}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex space-x-4 border-b">
          {['overview', 'matches', 'leaderboard', 'teams'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-bold ${
                activeTab === tab
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Tournament Rules</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{tournament.rules}</p>
            {tournament.prizePool && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-xl font-bold mb-2">Prize Pool</h3>
                <p className="text-gray-600">{tournament.prizePool}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="space-y-4">
            {matches.length > 0 ? (
              matches.map(match => (
                <div key={match._id} className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm mb-2">Match {match.matchNumber} • {match.status}</p>
                    <p className="text-lg font-bold">{match.team1?.name} vs {match.team2?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">{new Date(match.matchDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500">{match.venue}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 py-8">No matches scheduled yet</p>
            )}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left font-bold">Position</th>
                  <th className="px-6 py-3 text-left font-bold">Team</th>
                  <th className="px-6 py-3 text-center font-bold">Matches</th>
                  <th className="px-6 py-3 text-center font-bold">Wins</th>
                  <th className="px-6 py-3 text-center font-bold">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard?.entries?.map((entry, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3 font-bold">{entry.position}</td>
                    <td className="px-6 py-3">{entry.team?.name}</td>
                    <td className="px-6 py-3 text-center">{entry.matches}</td>
                    <td className="px-6 py-3 text-center">{entry.wins}</td>
                    <td className="px-6 py-3 text-center font-bold text-blue-600">{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tournament.teams?.map(team => (
              <div key={team._id} className="bg-white rounded-lg shadow-lg p-6">
                {team.logo && <img src={team.logo} alt={team.name} className="w-full h-32 object-cover rounded mb-4" />}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{team.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{team.description}</p>
                <div className="flex justify-between text-sm">
                  <span>Matches: {team.totalMatches}</span>
                  <span>Wins: {team.wins}</span>
                  <span>Losses: {team.losses}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TournamentDetail;
