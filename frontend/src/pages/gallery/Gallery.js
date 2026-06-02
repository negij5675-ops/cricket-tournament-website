import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import galleryService from '../../services/galleryService';
import { FaEye, FaThumbsUp, FaComment } from 'react-icons/fa';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await galleryService.getAllGallery();
      setGallery(response.data.data);
    } catch (err) {
      setError('Failed to fetch gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      await galleryService.likeMedia(id);
      fetchGallery();
    } catch (error) {
      console.error('Failed to like media');
    }
  };

  if (loading) return <div className="text-center py-12">Loading gallery...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">📸 Photo & Video Gallery</h1>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map(media => (
            <div
              key={media._id}
              onClick={() => setSelectedMedia(media)}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden cursor-pointer"
            >
              <div className="relative group">
                <img
                  src={media.thumbnail || media.mediaUrl}
                  alt={media.title}
                  className="w-full h-40 object-cover group-hover:opacity-75 transition"
                />
                {media.mediaType === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition">
                    <button className="bg-red-600 text-white rounded-full p-4 text-2xl">▶</button>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{media.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{media.description}</p>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span className="flex items-center space-x-1">
                    <FaEye /> <span>{media.views}</span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(media._id);
                    }}
                    className="flex items-center space-x-1 hover:text-red-600"
                  >
                    <FaThumbsUp /> <span>{media.likes}</span>
                  </button>
                  <span className="flex items-center space-x-1">
                    <FaComment /> <span>{media.comments?.length || 0}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Media Detail Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
              >
                ✕
              </button>
              {selectedMedia.mediaType === 'video' ? (
                <video
                  src={selectedMedia.mediaUrl}
                  controls
                  className="w-full h-96 object-cover"
                />
              ) : (
                <img src={selectedMedia.mediaUrl} alt={selectedMedia.title} className="w-full h-96 object-cover" />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedMedia.title}</h2>
                <p className="text-gray-600 mb-4">{selectedMedia.description}</p>
                <div className="flex justify-between text-gray-600 mb-6">
                  <span>Uploaded by: {selectedMedia.uploadedBy?.firstName} {selectedMedia.uploadedBy?.lastName}</span>
                  <span>{new Date(selectedMedia.uploadDate).toLocaleDateString()}</span>
                </div>
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <FaThumbsUp /> <span>Like ({selectedMedia.likes})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {gallery.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No media found in gallery</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
