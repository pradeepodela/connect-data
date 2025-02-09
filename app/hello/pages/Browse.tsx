import React, { useState } from 'react';
import { FileUp, Filter, Search, Zap, MoreHorizontal, ChevronDown } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { useLocation, useNavigate } from 'react-router-dom';

export function Browse() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data || [];
  const columns = location.state?.columns || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  if (!data.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No data available</h3>
          <p className="mt-1 text-sm text-gray-500">Upload your data in the dashboard to get started.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <FileUp className="-ml-0.5 mr-1.5 h-5 w-5" />
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <span className="text-blue-600 font-medium">People</span>
              <span className="text-gray-500">Enrichment</span>
            </div>
            <div className="flex items-center">
              <button className="text-gray-600 hover:text-gray-900">
                My Organization <ChevronDown className="inline-block w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Actions Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFilters.length > 0 && (
                    <span className="ml-2 bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 text-xs">
                      {activeFilters.length}
                    </span>
                  )}
                </button>
              </div>
              {/* Active Filters */}
              <div className="flex items-center space-x-2">
                {activeFilters.map((filter) => (
                  <span
                    key={filter}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                  >
                    {filter}
                    <button
                      onClick={() => handleRemoveFilter(filter)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Zap className="h-4 w-4 mr-2" />
                AI Search
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Add to Campaign
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="E.g Engineers in New York in software companies with more than 500 employees"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          {data.length} results found
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow">
          <DataTable data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
}