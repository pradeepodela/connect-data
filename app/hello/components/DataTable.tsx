import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Search, ArrowUpDown, ChevronLeft, ChevronRight, Filter, Mail, Download, Share2, Linkedin, Eye, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { LeadData } from '../types';

interface DataTableProps {
  data: LeadData[];
  columns: string[];
}

interface FilterState {
  [key: string]: string;
}

export function DataTable({ data, columns }: DataTableProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  const rowsPerPage = 10;

  const [savedProfiles, setSavedProfiles] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedProfiles');
    if (!saved) return [];
    return JSON.parse(saved).map((p: any) => p.id);
  });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSave = (profile: LeadData) => {
    const saved = localStorage.getItem('savedProfiles');
    let savedProfiles = saved ? JSON.parse(saved) : [];
    
    if (savedProfiles.some((p: any) => p.id === profile.id)) {
      savedProfiles = savedProfiles.filter((p: any) => p.id !== profile.id);
      setSavedProfiles(prev => prev.filter(id => id !== profile.id));
    } else {
      savedProfiles.push({
        id: profile.id,
        savedAt: new Date().toISOString(),
        profile
      });
      setSavedProfiles(prev => [...prev, profile.id]);
    }
    
    localStorage.setItem('savedProfiles', JSON.stringify(savedProfiles));
  };

  const filteredAndSortedData = useMemo(() => {
    let processedData = [...data];

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        processedData = processedData.filter(row => 
          String(row[key.toLowerCase().replace(/\s+/g, '')])
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      }
    });

    if (searchTerm) {
      processedData = processedData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortConfig) {
      processedData.sort((a, b) => {
        const aValue = String(a[sortConfig.key.toLowerCase().replace(/\s+/g, '')]);
        const bValue = String(b[sortConfig.key.toLowerCase().replace(/\s+/g, '')]);
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return processedData;
  }, [data, searchTerm, sortConfig, filters]);

  const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-8 px-3 py-3">
              <input type="checkbox" className="rounded border-gray-300" />
            </th>
            {columns.map((column) => (
              <th
                key={column}
                onClick={() => handleSort(column)}
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center space-x-1">
                  <span>{column}</span>
                  <ArrowUpDown className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((row, index) => (
            <tr key={row.id || index} className="hover:bg-gray-50 transition-colors">
              <td className="px-3 py-4">
                <input type="checkbox" className="rounded border-gray-300" />
              </td>
              {columns.map((column) => {
                const value = row[column.toLowerCase().replace(/\s+/g, '')];
                return (
                  <td key={column} className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {column.toLowerCase() === 'name' && (
                        <a
                          href={row.linkedinurl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-900 hover:text-blue-600 font-medium flex items-center"
                        >
                          {value}
                          <Linkedin className="h-4 w-4 ml-2 text-gray-400" />
                        </a>
                      )}
                      {column.toLowerCase() !== 'name' && (
                        <span className="text-sm text-gray-900">{value}</span>
                      )}
                    </div>
                  </td>
                );
              })}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-3">
                  {row.email && (
                    <a
                      href={`mailto:${row.email}`}
                      className="text-gray-400 hover:text-gray-600"
                      title="Send Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  <button
                    onClick={() => handleSave(row)}
                    className={`${
                      savedProfiles.includes(row.id)
                        ? 'text-blue-600 hover:text-blue-700'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title={savedProfiles.includes(row.id) ? 'Remove from saved' : 'Save profile'}
                  >
                    {savedProfiles.includes(row.id) ? (
                      <BookmarkCheck className="h-4 w-4" />
                    ) : (
                      <BookmarkPlus className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => navigate(`/profile/${row.id}`, { state: { profile: row } })}
                    className="text-gray-400 hover:text-gray-600"
                    title="View Profile"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredAndSortedData.length)} to{' '}
          {Math.min(currentPage * rowsPerPage, filteredAndSortedData.length)} of{' '}
          {filteredAndSortedData.length} results
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}