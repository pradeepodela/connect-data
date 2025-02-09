import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Mail, Linkedin, BookmarkPlus, BookmarkCheck, Share2 } from 'lucide-react';
import { LeadData } from '../types';

export function ProfileView() {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state?.profile as LeadData;
  
  const [isSaved, setIsSaved] = React.useState(() => {
    const saved = localStorage.getItem('savedProfiles');
    if (!saved) return false;
    const savedProfiles = JSON.parse(saved);
    return savedProfiles.some((p: any) => p.id === profile.id);
  });

  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p>Profile not found</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleSave = () => {
    const saved = localStorage.getItem('savedProfiles');
    let savedProfiles = saved ? JSON.parse(saved) : [];
    
    if (isSaved) {
      savedProfiles = savedProfiles.filter((p: any) => p.id !== profile.id);
    } else {
      savedProfiles.push({
        id: profile.id,
        savedAt: new Date().toISOString(),
        profile
      });
    }
    
    localStorage.setItem('savedProfiles', JSON.stringify(savedProfiles));
    setIsSaved(!isSaved);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="mb-8 flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{profile.position}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className={`p-2 rounded-full ${
                isSaved 
                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save profile'}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
            </button>
            <button
              onClick={() => {
                const text = `${profile.name} - ${profile.position} at ${profile.companyname}`;
                navigator.clipboard.writeText(text);
              }}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              title="Copy profile info"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Company Information
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Company:</span> {profile.companyname}
              </p>
              {/* Add more company-related fields here */}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
            <div className="space-y-3">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {profile.email}
                </a>
              )}
              {profile.linkedinurl && (
                <a
                  href={profile.linkedinurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn Profile
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(profile).map(([key, value]) => {
              // Skip already displayed fields and empty values
              if (['id', 'name', 'companyname', 'position', 'email', 'linkedinurl'].includes(key) || !value) {
                return null;
              }
              return (
                <div key={key} className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </p>
                  <p className="text-gray-900">{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}