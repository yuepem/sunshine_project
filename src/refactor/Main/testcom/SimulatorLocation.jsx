import useInputStore from "../../../stores/inputStore";
import { Home, Map, TriangleRight } from "lucide-react";

import useSunCalcStore from "../../../stores/sunSalcStore";

const LocationInfo = () => {
  const {
    sunPosition,
    radiansToDegreesForAzimuth,
    radiansToDegreesForAltitude,
  } = useSunCalcStore();

  const { address, toDMS } = useInputStore();

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
        <div className="text-slate-100 md:pl-2">{address}</div>

        <div className="flex items-center space-x-2 text-slate-400">
          <Map className="w-4 h-4" />
          <span className="text-sm">Latitude & Longitude</span>
        </div>

        {/* Coordinates */}
        <div className="text-slate-100 md:pl-2">
          <span>
            {latDMS}, {lonDMS}
          </span>
        </div>

        <div className="space-y-3">
          {/* Position Info */}
          <div className="flex items-center space-x-2 text-slate-400">
            <TriangleRight className="w-4 h-4" />
            <span className="text-sm">Azimuth & Altitude </span>
          </div>
          <div className="text-slate-100 md:pl-2">
            <span>
              {radiansToDegreesForAzimuth(sunPosition.azimuth).toFixed(2)} ° /{" "}
              {radiansToDegreesForAltitude(sunPosition.altitude).toFixed(2)} °
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
