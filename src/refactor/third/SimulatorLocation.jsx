import React from 'react';
import { Home, Map } from 'lucide-react';

const LocationInfo = () => {
  return (
    <div className="bg-slate-800/30 rounded-xl p-4">
      <div className="space-y-3">
        {/* Location Header */}
        <div className="flex items-center space-x-2 text-slate-400">
          <Home className="w-4 h-4" />
          <span className="text-sm">Current Location</span>
        </div>
        
        {/* Address */}
        <div className="text-slate-100">
          Gustav Adolfs Torg, 103 21, Stockholm, Sweden
        </div>
        
        {/* Coordinates */}
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <Map className="w-4 h-4" />
          <span>59° 19' 45" N 18° 4' 7" E</span>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;