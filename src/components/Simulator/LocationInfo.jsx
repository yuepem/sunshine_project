import useInputStore from "../../stores/inputStore";
import { Home, Map, TriangleRight } from "lucide-react";

import useSunCalcStore from "../../stores/sunSalcStore";

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
    <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl shadow-xl p-2 ">
      {/* DateTime Selectors */}
      <div className="grid grid-rows-2 gap-4 mb-4">
        <button className="group flex items-center space-x-3 p-2 md:p-2 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors">
          <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
            <Home className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-left text-sm">
            <div className=" text-slate-400">Current Location</div>
            <div className="text-slate-200 ">{address}</div>
          </div>
        </button>

        <button className="group flex items-center space-x-3 p-2 md:p-2 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors">
          <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
            <TriangleRight className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-left">
            <div className="text-sm text-slate-400">Latitude & Longitude</div>
            <div className="text-slate-200">
              <span>
                {latDMS}, {lonDMS}
              </span>
            </div>
          </div>
        </button>

        <button className="group flex items-center space-x-3 p-2 md:p-2 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors">
          <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
            <Map className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-left">
            <div className="text-sm text-slate-400">Azimuth & Longitude</div>
            <div className="text-slate-200">
              <span>
                {radiansToDegreesForAzimuth(sunPosition.azimuth).toFixed(2)} ° /{" "}
                {radiansToDegreesForAltitude(sunPosition.altitude).toFixed(2)} °
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LocationInfo;
