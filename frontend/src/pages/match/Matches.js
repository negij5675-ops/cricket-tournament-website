import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import matchService from '../../services/matchService';
import { FaCalendar, FaMapMarkerAlt, FaPlay } from 'react-icons/fa';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await matchService.getAllMatches();
      setMatches(response.data.data);
    } catch (err) {
      setError('Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  const filteredMatches = filter === 'all'
    ? matches
    : matches.filter(m => m.status === filter);

  if (loading) return <div className="text-center py-12">Loading matches...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">🎯 Matches</h1>

        {/* Filter */}
        <div className="mb-8 flex flex-wrap gap-4">
          {['all', 'scheduled', 'live', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-bold ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Matches List */}
        <div className="space-y-4">
          {filteredMatches.map(match => (
            <Link
              key={match._id}
              to={`/matches/${match._id}`}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      match.status === 'live' ? 'bg-red-100 text-red-800' :
                      match.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {match.status === 'live' && <FaPlay className="inline mr-1" />}
                      {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                    </span>
                    <span className="text-gray-600 text-sm">Match #{match.matchNumber}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {match.team1?.name} vs {match.team2?.name}
                  </h3>
                  <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <FaCalendar className="text-blue-500" />
                      <span>{new Date(match.matchDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span>{match.venue}</span>
                    </div>
                  </div>
                </div>
                {match.result?.winner && (
                  <div className="text-right">
                    <p className="text-gray-600 text-sm mb-1">Winner</p>
                    <p className="font-bold text-lg text-green-600">{match.result.winner?.name}</p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No {filter} matches found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
