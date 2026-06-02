import React, { useEffect, useState } from 'react';
import newsService from '../../services/newsService';
import { FaCalendar, FaUser, FaEye } from 'react-icons/fa';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await newsService.getAllNews();
      setNews(response.data.data);
    } catch (err) {
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = filter === 'all'
    ? news
    : news.filter(n => n.category === filter);

  if (loading) return <div className="text-center py-12">Loading news...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">📰 News & Updates</h1>

        {/* Filter */}
        <div className="mb-8 flex flex-wrap gap-4">
          {['all', 'tournament', 'team', 'player', 'general'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-lg font-bold ${
                filter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-50'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured News */}
          {filteredNews.length > 0 && (
            <div className="lg:col-span-2 mb-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {filteredNews[0].featuredImage && (
                  <img src={filteredNews[0].featuredImage} alt={filteredNews[0].title} className="w-full h-96 object-cover" />
                )}
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{filteredNews[0].title}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <FaUser />
                      <span>{filteredNews[0].author?.firstName} {filteredNews[0].author?.lastName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaCalendar />
                      <span>{new Date(filteredNews[0].publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaEye />
                      <span>{filteredNews[0].views} views</span>
                    </div>
                  </div>
                  <p className="text-gray-600 line-clamp-4 mb-4">{filteredNews[0].content}</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-bold">Read More</button>
                </div>
              </div>
            </div>
          )}

          {/* News List */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Latest News</h3>
            <div className="space-y-4">
              {filteredNews.slice(0, 5).map(article => (
                <div key={article._id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition">
                  <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">{article.title}</h4>
                  <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                    <FaCalendar />
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{article.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
