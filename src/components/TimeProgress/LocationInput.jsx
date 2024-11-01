import React, { useState } from 'react';
import { Search } from 'lucide-react';

const LocationInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="p-4 space-y-3 rounded-xl bg-slate-800/50 text-sm">
      {/* Search Bar */}
      <div className={`flex items-center bg-slate-500/30 rounded-xl overflow-hidden transition-all duration-200 ${
        isSearchFocused ? 'ring-1 ring-teal-500/50 bg-slate-800/70' : ''
      }`}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder="Type your address here"
          className="flex-1 bg-transparent px-4 py-2 outline-none text-slate-200 placeholder-slate-400"
        />
        <button className="px-4 hover:text-teal-400 transition-colors">
          <Search className="w-5 h-5 text-teal-400" />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 ">
        <button className="px-4 py-2 bg-teal-800 hover:bg-teal-600 transition-colors rounded-xl text-white ">
          Get Location
        </button>
        
        <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 transition-colors rounded-xl text-slate-200">
          On Map
        </button>
      </div>
    </div>
  );
};

export default LocationInput;