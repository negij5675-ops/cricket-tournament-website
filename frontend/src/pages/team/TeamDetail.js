import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import teamService from '../../services/teamService';
import { FaUser, FaTrophy } from 'react-icons/fa';

const TeamDetail = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchTeamDetails();
    fetchTeamPlayers();
    fetchTeamStats();
  }, [id]);

  const fetchTeamDetails = async () => {
    try {
      const response = await teamService.getTeamById(id);
      setTeam(response.data.data);
    } catch (error) {
      console.error('Failed to fetch team details');
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamPlayers = async () => {
    try {
      const response = await teamService.getTeamPlayers(id);
      setPlayers(response.data.data);
    } catch (error) {
      console.error('Failed to fetch players');
    }
  };

  const fetchTeamStats = async () => {
    try {
      const response = await teamService.getTeamStatistics(id);
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch statistics');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!team) return <div className="text-center py-12">Team not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-8">
            {team.logo && <img src={team.logo} alt={team.name} className="w-32 h-32 object-contain" />}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{team.name}</h1>
              <p className="text-gray-600 text-xl uppercase font-bold mb-4">{team.shortName}</p>
              <p className="text-gray-600 mb-4">{team.description}</p>
              {stats && (
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Matches</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.totalMatches}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Wins</p>
                    <p className="text-2xl font-bold text-green-600">{stats.wins}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Losses</p>
                    <p className="text-2xl font-bold text-red-600">{stats.losses}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Win %</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.winPercentage}%</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex space-x-4 border-b">
          {['overview', 'players'].map(tab => (
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

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Manager</h3>
                <p className="text-gray-600">{team.manager?.firstName} {team.manager?.lastName}</p>
                <p className="text-gray-600 text-sm">{team.manager?.email}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Captain</h3>
                <p className="text-gray-600">#{team.captainId?.jerseyNumber}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Vice Captain</h3>
                <p className="text-gray-600">#{team.vice_captainId?.jerseyNumber}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'players' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map(player => (
              <div key={player._id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <FaUser className="text-2xl text-blue-600" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{player.userId?.firstName} {player.userId?.lastName}</h3>
                    <p className="text-sm text-gray-600">#{player.jerseyNumber}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-600 mb-2"><span className="font-bold">Role:</span> {player.role}</p>
                  {player.battingHand && <p className="text-sm text-gray-600 mb-2"><span className="font-bold">Bats:</span> {player.battingHand}</p>}
                  {player.bowlingStyle && <p className="text-sm text-gray-600"><span className="font-bold">Bowls:</span> {player.bowlingStyle}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDetail;
