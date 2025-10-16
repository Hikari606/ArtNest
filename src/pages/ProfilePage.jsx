import React, { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem('artnest_profile');
      return raw
        ? JSON.parse(raw)
        : { name: 'Amna', email: 'amna@example.com', bio: 'Maker, dreamer, coffee-lover' };
    } catch {
      return { name: 'Amna', email: 'amna@example.com', bio: 'Maker, dreamer, coffee-lover' };
    }
  });

  useEffect(() => {
    localStorage.setItem('artnest_profile', JSON.stringify(profile));
  }, [profile]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff7fb] via-[#ffe6e0] to-[#bde0fe] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-[#bf4b6a] text-center">{profile.name}</h2>
        <form className="grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 font-semibold">Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bf4b6a] transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 font-semibold">Email</label>
            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bf4b6a] transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 font-semibold">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows={4}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bf4b6a] transition resize-none"
            />
          </div>

          <div className="flex gap-4 justify-end mt-2">
            <button
              type="button"
              onClick={() => setProfile({ name: '', email: '', bio: '' })}
              className="px-5 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => alert('Profile saved — this is a mock demo.')}
              className="px-5 py-3 rounded-xl bg-[#bf4b6a] text-white font-semibold hover:bg-[#d76b91] transition transform hover:-translate-y-1"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
