import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Search, Trash2 } from 'lucide-react';
import { SavedProfile } from '../types';

export function SavedProfiles() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [savedProfiles, setSavedProfiles] = React.useState<SavedProfile[]>(() => {
    try {
      const saved = localStorage.getItem('savedProfiles');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error loading saved profiles:', error);
      return [];
    }
  });

  const filteredProfiles = savedProfiles.filter(saved => {
    if (!saved?.profile) return false;
    const searchLower = searchTerm.toLowerCase();
    const name = saved.profile.name?.toLowerCase() || '';
    const company = saved.profile.companyname?.toLowerCase() || '';
    return name.includes(searchLower) || company.includes(searchLower);
  });

  const handleRemove = (id: string) => {
    const updatedProfiles = savedProfiles.filter(p => p.id !== id);
    localStorage.setItem('savedProfiles', JSON.stringify(updatedProfiles));
    setSavedProfiles(updatedProfiles);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Bookmark className="w-6 h-6 mr-2" />
            Saved Profiles
          </h1>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search saved profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {filteredProfiles.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="w-12 h-12 mx-auto text-gray-400" />
            <p className="mt-4 text-lg text-gray-500">No saved profiles found</p>
            <p className="mt-2 text-sm text-gray-400">
              {searchTerm ? 'Try a different search term' : 'Save some profiles to see them here'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProfiles.map(({ id, profile, savedAt }) => (
              <div key={id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg text-gray-900">{profile?.name || 'Unnamed Profile'}</h3>
                  <button
                    onClick={() => handleRemove(id)}
                    className="text-gray-400 hover:text-red-500"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-600">{profile?.position || 'No position specified'}</p>
                <p className="text-gray-500 text-sm">{profile?.companyname || 'No company specified'}</p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => navigate(`/profile/${id}`, { state: { profile } })}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Profile
                  </button>
                  <span className="text-xs text-gray-400">
                    Saved {new Date(savedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}