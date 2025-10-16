import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.username || '',
    email: user?.email || '',
    bio: '',
    photo: '',
    storeName: user?.shopName || '',
    address: '',
    phone: '',
    website: ''
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    setMounted(true);
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem(`profile_${user?.shopId}`);
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      if (parsedProfile.photo) {
        setPhotoPreview(parsedProfile.photo);
      }
    }
  }, [user]);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = e.target.result;
        setPhotoPreview(photoData);
        setProfile({ ...profile, photo: photoData });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save profile to localStorage
    localStorage.setItem(`profile_${user?.shopId}`, JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reload from localStorage
    const savedProfile = localStorage.getItem(`profile_${user?.shopId}`);
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    setIsEditing(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fff7fb] via-[#ffe6e0] to-[#bde0fe] flex items-center justify-center">
        <div className="text-[#bf4b6a] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7fb] via-[#ffe6e0] to-[#bde0fe] p-6">
      <div className="max-w-4xl mx-auto">
        <div className={`bg-white rounded-3xl shadow-xl p-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-[#bf4b6a]">Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 rounded-xl bg-[#bf4b6a] text-white hover:bg-[#d76b91] transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 rounded-xl bg-[#bf4b6a] text-white hover:bg-[#d76b91] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Photo & Basic Info */}
            <div className="lg:col-span-1">
              <div className="bg-[#fff7fb] rounded-2xl p-6 border border-[#f3e1e6]">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#ffdbe6] bg-gray-100 flex items-center justify-center">
                    {photoPreview || profile.photo ? (
                      <img 
                        src={photoPreview || profile.photo} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-4xl text-[#bf4b6a]">🏪</div>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="w-full px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#bf4b6a] file:text-white hover:file:bg-[#d76b91] focus:border-[#bf4b6a] focus:ring-2 focus:ring-[#ffe6e0]"
                        />
                      </div>
                      {photoPreview && (
                        <div className="mt-2">
                          <p className="text-sm text-green-600">✓ Photo uploaded successfully</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <h2 className="text-2xl font-bold text-[#bf4b6a] mb-2">{profile.name}</h2>
                  )}

                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400 focus:border-[#bf4b6a] focus:ring-2 focus:ring-[#ffe6e0]"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400 focus:border-[#bf4b6a] focus:ring-2 focus:ring-[#ffe6e0]"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-gray-600">{profile.email}</p>
                      <p className="text-sm text-gray-500">Role: {user?.role}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Store Information */}
            <div className="lg:col-span-2">
              <div className="bg-[#f8fbff] rounded-2xl p-6 border border-[#e5f0ff] mb-6">
                <h3 className="text-xl font-bold text-[#3b82f6] mb-4">Store Information</h3>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                      <input
                        type="text"
                        value={profile.storeName}
                        onChange={(e) => setProfile({ ...profile, storeName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400 focus:border-[#bf4b6a] focus:ring-2 focus:ring-[#ffe6e0]"
                        placeholder="Enter store name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <textarea
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400 focus:border-[#bf4b6a] focus:ring-2 focus:ring-[#ffe6e0] h-20 resize-none"
                        placeholder="Enter store address"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400 focus:border-[#bf4b6a] focus:ring-2 focus:ring-[#ffe6e0]"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        <input
                          type="url"
                          value={profile.website}
                          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400 focus:border-[#bf4b6a] focus:ring-2 focus:ring-[#ffe6e0]"
                          placeholder="Enter website URL"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Store Name</h4>
                      <p className="text-gray-600">{profile.storeName || 'Not set'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                      <p className="text-gray-600">{profile.address || 'Not set'}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                        <p className="text-gray-600">{profile.phone || 'Not set'}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Website</h4>
                        <p className="text-gray-600">
                          {profile.website ? (
                            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-[#bf4b6a] hover:underline">
                              {profile.website}
                            </a>
                          ) : (
                            'Not set'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bio Section */}
              <div className="bg-[#fff7fb] rounded-2xl p-6 border border-[#f3e1e6]">
                <h3 className="text-xl font-bold text-[#bf4b6a] mb-4">About</h3>
                
                {isEditing ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400 focus:border-[#bf4b6a] focus:ring-2 focus:ring-[#ffe6e0] h-24 resize-none"
                      placeholder="Tell us about your store..."
                    />
                  </div>
                ) : (
                  <p className="text-gray-600">
                    {profile.bio || 'No bio available. Click "Edit Profile" to add one.'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;