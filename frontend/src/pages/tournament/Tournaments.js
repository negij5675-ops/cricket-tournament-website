import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tournamentService from '../../services/tournamentService';
import { FaCalendar, FaMapMarkerAlt, FaTrophy } from 'react-icons/fa';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await tournamentService.getAllTournaments();
      setTournaments(response.data.data);
    } catch (err) {
      setError('Failed to fetch tournaments');
    } finally {
      setLoading(false);
    }
  };

  const filteredTournaments = filter === 'all' 
    ? tournaments 
    : tournaments.filter(t => t.status === filter);

  if (loading) return <div className="text-center py-12">Loading tournaments...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">🏆 Tournaments</h1>

        {/* Filter */}
        <div className="mb-8 flex space-x-4">
          {['all', 'upcoming', 'ongoing', 'completed'].map(status => (
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

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map(tournament => (
            <Link
              key={tournament._id}
              to={`/tournaments/${tournament._id}`}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
            >
              {tournament.bannerImage && (
                <img src={tournament.bannerImage} alt={tournament.name} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{tournament.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{tournament.description}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <FaTrophy className="text-yellow-500" />
                    <span>{tournament.format} ({tournament.totalOvers} Overs)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{tournament.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCalendar className="text-blue-500" />
                    <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    tournament.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                    tournament.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No {filter} tournaments found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tournaments;
