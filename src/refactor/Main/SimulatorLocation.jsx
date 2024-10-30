import useInputStore from '../../stores/inputStore';
import { Home, Map } from 'lucide-react';


const LocationInfo = () => {

  const {  address, toDMS } = useInputStore();
 
  const latDMS = toDMS().latitude;
  const lonDMS = toDMS().longitude;

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
          {address}
        </div>
        
        {/* Coordinates */}
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <Map className="w-4 h-4" />
          <span>{latDMS},  {lonDMS}</span>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;