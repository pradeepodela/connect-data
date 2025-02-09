import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, Bookmark, Table2 } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900';
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Database className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LeadData</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`${isActive('/')} inline-flex items-center px-1 pt-1 text-sm font-medium`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`${isActive('/dashboard')} inline-flex items-center px-1 pt-1 text-sm font-medium`}
            >
              Dashboard
            </Link>
            <Link
              to="/browse"
              className={`${isActive('/browse')} inline-flex items-center px-1 pt-1 text-sm font-medium`}
            >
              <Table2 className="w-4 h-4 mr-1" />
              Browse
            </Link>
            <Link
              to="/saved"
              className={`${isActive('/saved')} inline-flex items-center px-1 pt-1 text-sm font-medium`}
            >
              <Bookmark className="w-4 h-4 mr-1" />
              Saved
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}