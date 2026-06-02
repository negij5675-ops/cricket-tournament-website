import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import authService from '../../services/authService';

const UserProfile = () => {
  const { auth, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      setProfile(auth);
      setFormData(auth);
      setLoading(false);
    }
  }, [auth]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.updateProfile(formData);
      setProfile(response.data.data);
      setEditing(false);
    } catch (error) {
      console.error('Failed to update profile');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!profile) return <div className="text-center py-12">Please login to view your profile</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">👤 My Profile</h1>

          {!editing ? (
            <div>
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-gray-600 font-bold">First Name</label>
                  <p className="text-gray-800 text-lg">{profile.firstName}</p>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold">Last Name</label>
                  <p className="text-gray-800 text-lg">{profile.lastName}</p>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold">Email</label>
                  <p className="text-gray-800 text-lg">{profile.email}</p>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold">Phone</label>
                  <p className="text-gray-800 text-lg">{profile.phone}</p>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold">Role</label>
                  <p className="text-gray-800 text-lg capitalize">{profile.role}</p>
                </div>
                {profile.bio && (
                  <div>
                    <label className="block text-gray-600 font-bold">Bio</label>
                    <p className="text-gray-800 text-lg">{profile.bio}</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-bold"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    window.location.href = '/';
                  }}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-bold"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-bold"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
