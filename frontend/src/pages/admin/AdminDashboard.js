import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import tournamentService from '../../services/tournamentService';
import { FaPlus } from 'react-icons/fa';

const AdminDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    format: 'T20',
    totalOvers: 20,
    location: '',
    startDate: '',
    endDate: '',
    maxTeams: 8
  });

  useEffect(() => {
    if (auth?.role === 'admin') {
      fetchTournaments();
    }
  }, [auth]);

  const fetchTournaments = async () => {
    try {
      const response = await tournamentService.getAllTournaments();
      setTournaments(response.data.data);
    } catch (error) {
      console.error('Failed to fetch tournaments');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await tournamentService.createTournament(formData);
      setShowForm(false);
      setFormData({
        name: '',
        description: '',
        format: 'T20',
        totalOvers: 20,
        location: '',
        startDate: '',
        endDate: '',
        maxTeams: 8
      });
      fetchTournaments();
    } catch (error) {
      console.error('Failed to create tournament');
    }
  };

  if (auth?.role !== 'admin') {
    return <div className="text-center py-12 text-red-600">You do not have access to this page</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">⚙️ Admin Dashboard</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-bold flex items-center space-x-2"
          >
            <FaPlus /> <span>Create Tournament</span>
          </button>
        </div>

        {/* Create Tournament Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Tournament</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Tournament Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Format</label>
                  <select
                    name="format"
                    value={formData.format}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="T20">T20</option>
                    <option value="ODI">ODI</option>
                    <option value="10-Over">10-Over</option>
                    <option value="5-Over">5-Over</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Total Overs</label>
                  <input
                    type="number"
                    name="totalOvers"
                    value={formData.totalOvers}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Max Teams</label>
                <input
                  type="number"
                  name="maxTeams"
                  value={formData.maxTeams}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-bold"
                >
                  Create Tournament
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tournaments Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-bold">Tournament</th>
                <th className="px-6 py-3 text-left font-bold">Format</th>
                <th className="px-6 py-3 text-left font-bold">Teams</th>
                <th className="px-6 py-3 text-left font-bold">Status</th>
                <th className="px-6 py-3 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map(tournament => (
                <tr key={tournament._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3 font-bold">{tournament.name}</td>
                  <td className="px-6 py-3">{tournament.format}</td>
                  <td className="px-6 py-3">{tournament.teams?.length || 0}/{tournament.maxTeams}</td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      tournament.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                      tournament.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {tournament.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button className="text-blue-600 hover:text-blue-800 font-bold">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
