import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import matchService from '../../services/matchService';
import { FaCalendar, FaMapMarkerAlt, FaTrophy } from 'react-icons/fa';

const MatchDetail = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [scorecard, setScorecard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('scorecard');

  useEffect(() => {
    fetchMatchDetails();
    fetchScorecard();
  }, [id]);

  const fetchMatchDetails = async () => {
    try {
      const response = await matchService.getMatchById(id);
      setMatch(response.data.data);
    } catch (error) {
      console.error('Failed to fetch match details');
    } finally {
      setLoading(false);
    }
  };

  const fetchScorecard = async () => {
    try {
      const response = await matchService.getMatchScorecard(id);
      setScorecard(response.data.data);
    } catch (error) {
      console.error('Failed to fetch scorecard');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!match) return <div className="text-center py-12">Match not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Match Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <span className={`inline-block px-4 py-2 rounded-full font-bold text-lg ${
              match.status === 'live' ? 'bg-red-100 text-red-800' :
              match.status === 'completed' ? 'bg-green-100 text-green-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            {match.team1?.name} vs {match.team2?.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center space-x-3">
              <FaCalendar className="text-blue-500 text-2xl" />
              <div>
                <p className="text-gray-600 text-sm">Date</p>
                <p className="font-bold">{new Date(match.matchDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-red-500 text-2xl" />
              <div>
                <p className="text-gray-600 text-sm">Venue</p>
                <p className="font-bold">{match.venue}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaTrophy className="text-yellow-500 text-2xl" />
              <div>
                <p className="text-gray-600 text-sm">Format</p>
                <p className="font-bold">{match.tournament?.format} ({match.tournament?.totalOvers} Overs)</p>
              </div>
            </div>
          </div>

          {/* Score Display */}
          {match.innings && match.innings.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {match.innings.map((inning, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Innings {index + 1}: {inning.team?.name}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-4xl font-bold text-blue-600">{inning.runs}</p>
                      <p className="text-gray-600 text-sm">Runs</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{inning.wickets}</p>
                      <p className="text-gray-600 text-sm">Wickets</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-purple-600">{inning.overs}.{inning.balls}</p>
                      <p className="text-gray-600 text-sm">Overs</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Result */}
        {match.result && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Match Result</h2>
            <p className="text-xl text-gray-700 mb-4">Winner: <span className="font-bold text-green-600">{match.result.winner?.name}</span></p>
            <p className="text-gray-600">Margin: {match.result.margin}</p>
            {match.result.description && <p className="text-gray-600 mt-2">{match.result.description}</p>}
            {match.manOfTheMatch && (
              <div className="mt-4 pt-4 border-t-2 border-green-200">
                <p className="text-gray-600">Man of the Match: <span className="font-bold">{match.manOfTheMatch?.userId?.firstName} {match.manOfTheMatch?.userId?.lastName}</span></p>
              </div>
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8 flex space-x-4 border-b bg-white rounded-t-lg px-6">
          {['scorecard', 'statistics'].map(tab => (
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
        {activeTab === 'scorecard' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-center text-gray-600 py-8">Detailed scorecard will be displayed here</p>
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-center text-gray-600 py-8">Match statistics will be displayed here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetail;
