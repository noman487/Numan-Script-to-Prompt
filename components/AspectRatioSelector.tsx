
import React from 'react';
import { AspectRatio } from '../types';

interface AspectRatioSelectorProps {
  selectedRatio: AspectRatio;
  onSelectRatio: (ratio: AspectRatio) => void;
}

const ratios: AspectRatio[] = ["16:9", "9:16", "4:3", "3:4", "1:1"];

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedRatio, onSelectRatio }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {ratios.map(ratio => {
        const isSelected = selectedRatio === ratio;
        return (
          <button
            key={ratio}
            onClick={() => onSelectRatio(ratio)}
            className={`py-2 px-1 text-sm font-semibold rounded-lg border-2 transition-all duration-200 ease-in-out transform hover:scale-105
              ${isSelected
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:border-slate-500'
              }`}
          >
            {ratio}
          </button>
        );
      })}
    </div>
  );
};
