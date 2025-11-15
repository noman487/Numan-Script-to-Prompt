
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ file, setFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  }, [setFile]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${isDragging ? 'border-indigo-500 bg-slate-700/50' : 'border-slate-600 bg-slate-700 hover:border-slate-500'}`}
    >
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center justify-center">
        {file ? (
          <>
            <p className="text-sm font-medium text-green-400">File Uploaded:</p>
            <p className="text-xs text-slate-300 truncate max-w-full">{file.name}</p>
            <button
              onClick={() => setFile(null)}
              className="mt-2 text-xs bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Remove
            </button>
          </>
        ) : (
          <>
            <UploadIcon className="w-10 h-10 text-slate-400 mb-2" />
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF</p>
          </>
        )}
      </div>
    </div>
  );
};
