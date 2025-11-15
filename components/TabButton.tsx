
import React from 'react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors duration-200 relative
        ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}
      `}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-t-full"></span>
      )}
    </button>
  );
};
