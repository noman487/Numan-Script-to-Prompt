
import React from 'react';

interface StatCounterProps {
  value: number;
  label: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({ value, label }) => {
  return (
    <div className="bg-slate-700/50 p-2 rounded-lg">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
};
