import React from 'react';
import { Clock } from 'lucide-react';

const TimeProgress = () => {
  // Calculate width for progress
  const progress = 67;
  const containerStyle = {
    background: `linear-gradient(to right, 
      rgb(226 232 240) 0%, 
      rgb(226 232 240) ${progress}%, 
      rgba(226, 232, 240, 0.3) ${progress}%, 
      rgba(226, 232, 240, 0.3) 100%)`
  };

  return (
    <div className="p-4 bg-slate-800/30 rounded-xl space-y-3">
      {/* Time Display */}
      <div className="flex items-baseline space-x-4">
        <div className="text-4xl font-semibold text-slate-100">16:54</div>
        <div className="text-slate-400">Monday, October 28</div>
      </div>
      
      {/* Year Progress */}
      <div 
        style={containerStyle}
        className="rounded-lg transition-all duration-500"
      >
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="text-slate-800">
            67% of 2024 has passed.
          </div>
          <div className="flex items-center space-x-2 text-slate-600 text-sm">
            <Clock className="w-4 h-4" />
            <span>116 D, 16:56 </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeProgress;