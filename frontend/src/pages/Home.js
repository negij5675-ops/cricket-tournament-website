import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">🏏 Welcome to Local Cricket Tournament Platform</h1>
        <p className="text-xl mb-8">Manage, Track, and Celebrate Local Cricket Tournaments</p>
        <div className="flex justify-center space-x-4">
          <a href="/tournaments" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100">Explore Tournaments</a>
          <a href="/register" className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600">Get Started</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 text-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Amazing Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">🎯 Tournament Management</h3>
              <p>Create and manage tournaments with customizable overs and formats</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">📊 Live Scoring</h3>
              <p>Real-time score updates and match statistics</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">👥 Player Statistics</h3>
              <p>Detailed player performance and career statistics</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">📸 Photo & Video Gallery</h3>
              <p>Share match highlights and memorable moments</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">📰 News & Updates</h3>
              <p>Latest cricket news and tournament updates</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">🔔 Real-Time Notifications</h3>
              <p>Get instant notifications for match updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center text-white">
        <h2 className="text-4xl font-bold mb-8">Ready to Start Your Journey?</h2>
        <p className="text-xl mb-8">Join thousands of cricket enthusiasts and create your tournament today!</p>
        <a href="/register" className="inline-block bg-green-500 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-600">Register Now</a>
      </section>
    </div>
  );
};

export default Home;
