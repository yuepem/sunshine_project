import React from 'react';
import { Clock, Sun, Navigation } from 'lucide-react';

const SunPositionDetails = () => {
  return (
    <div className="bg-slate-800/30 rounded-xl p-4">
      <div className="space-y-3">
        {/* Time Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Local Time</span>
          </div>
          <span className="text-slate-100">13:38:16</span>
        </div>

        {/* Position Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-400">
              <Sun className="w-4 h-4" />
              <span className="text-sm">Azimuth</span>
            </div>
            <span className="text-slate-100">211.49°</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-400">
              <Navigation className="w-4 h-4" />
              <span className="text-sm">Altitude</span>
            </div>
            <span className="text-slate-100">12.73°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunPositionDetails;