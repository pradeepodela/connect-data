import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { ProfileView } from './pages/ProfileView';
import { SavedProfiles } from './pages/SavedProfiles';
import { Browse } from './pages/Browse';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile/:id" element={<ProfileView />} />
          <Route path="/saved" element={<SavedProfiles />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;