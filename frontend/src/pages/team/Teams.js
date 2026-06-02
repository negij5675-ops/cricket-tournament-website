import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import teamService from '../../services/teamService';
import { FaUsers, FaTrophy } from 'react-icons/fa';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamService.getAllTeams();
      setTeams(response.data.data);
    } catch (err) {
      setError('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-12">Loading teams...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">👥 Teams</h1>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map(team => (
            <Link
              key={team._id}
              to={`/teams/${team._id}`}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
            >
              {team.logo && (
                <img src={team.logo} alt={team.name} className="w-full h-40 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{team.name}</h3>
                <p className="text-gray-600 text-sm mb-4 uppercase font-semibold">{team.shortName}</p>
                <p className="text-gray-600 mb-4 line-clamp-2">{team.description}</p>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <FaUsers className="text-blue-500" />
                    <span>City: {team.city}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaTrophy className="text-yellow-500" />
                    <span>{team.wins}W - {team.losses}L ({team.totalMatches} Total)</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-bold">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No teams found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
