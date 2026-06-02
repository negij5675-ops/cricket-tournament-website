import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder - will integrate with playerService
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">🏏 Players</h1>
        <div className="text-center py-12 bg-white rounded-lg shadow-lg">
          <p className="text-xl text-gray-600 mb-4">Player management interface coming soon</p>
          <Link to="/teams" className="text-blue-600 hover:text-blue-800 font-bold">
            Browse Teams
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Players;
