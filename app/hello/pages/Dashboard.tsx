import React, { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from '../components/FileUpload';
import { Database, ArrowRight } from 'lucide-react';
import { LeadData } from '../types';

export function Dashboard() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedData, setUploadedData] = useState<{
    data: LeadData[];
    columns: string[];
  } | null>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    setIsProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length === 0) {
        throw new Error('No data found in the Excel file');
      }

      const firstRow = jsonData[0] as Record<string, unknown>;
      const columnNames = Object.keys(firstRow);

      const transformedData = jsonData.map((row: Record<string, unknown>, index) => ({
        id: String(index + 1),
        ...Object.fromEntries(
          Object.entries(row).map(([key, value]) => [
            key.toLowerCase().replace(/\s+/g, ''),
            String(value)
          ])
        )
      }));

      setUploadedData({
        data: transformedData as LeadData[],
        columns: columnNames
      });
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing the Excel file. Please make sure it\'s a valid .xlsx file.');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleBrowse = () => {
    if (uploadedData) {
      navigate('/browse', { state: uploadedData });
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Upload Your Data</h2>
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        {uploadedData && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Data Preview</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {uploadedData.data.length} {uploadedData.data.length === 1 ? 'entry' : 'entries'} loaded
                </p>
              </div>
              <button
                onClick={handleBrowse}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Data
                <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
              </button>
            </div>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {uploadedData.columns.slice(0, 5).map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        {column}
                      </th>
                    ))}
                    {uploadedData.columns.length > 5 && (
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="text-gray-500">+{uploadedData.columns.length - 5} more</span>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {uploadedData.data.slice(0, 5).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {uploadedData.columns.slice(0, 5).map((column) => (
                        <td
                          key={column}
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500"
                        >
                          {row[column.toLowerCase().replace(/\s+/g, '')]}
                        </td>
                      ))}
                      {uploadedData.columns.length > 5 && (
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm text-gray-500 sm:pr-6">
                          ...
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {uploadedData.data.length > 5 && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                  <div className="text-sm text-gray-500">
                    Showing 5 of {uploadedData.data.length} entries
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}