import React, { useCallback, useState } from 'react';
import { Upload, FileUp } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        onFileUpload(file);
      } else {
        alert('Please upload a valid Excel file (.xlsx)');
      }
    },
    [onFileUpload]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-blue-500'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center">
        {isDragging ? (
          <FileUp className="w-12 h-12 text-blue-500 animate-bounce" />
        ) : (
          <Upload className="w-12 h-12 text-gray-400" />
        )}
        <p className="mt-4 text-lg font-medium text-gray-900">
          {isDragging ? 'Drop your file here' : 'Drag and drop your Excel file'}
        </p>
        <p className="mt-2 text-sm text-gray-500">or</p>
        <label className="mt-2 cursor-pointer">
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Browse files
          </span>
          <input
            type="file"
            className="hidden"
            accept=".xlsx"
            onChange={handleFileChange}
          />
        </label>
        <p className="mt-2 text-xs text-gray-400">Supports .xlsx files only</p>
      </div>
    </div>
  );
}