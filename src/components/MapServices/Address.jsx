import LocationButton from "./LocationButton";
import useInputStore from "../../stores/inputStore";
import useSunCalcStore from "../../stores/sunSalcStore";
import { House } from "lucide-react";
const Address = () => {
  const { address, toDMS } = useInputStore();
  const {
    sunPosition,
    radiansToDegreesForAzimuth,
    radiansToDegreesForAltitude,
  } = useSunCalcStore();

  const latDMS = toDMS().latitude;
  const lonDMS = toDMS().longitude;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ">
        {/* Address Title */}
        <h1 className="flex items-center text-xs sm:text-sm font-semibold text-white rounded-lg backdrop-blur-sm bg-slate-800/30 py-7 px-3 hover:bg-slate-800/60">
          <House className="mr-3" size={25} />
          <span>{address}</span>
        </h1>

        {/* Controls and Info Container */}
        <div className="flex flex-row items-center justify-between sm:justify-start gap-4">
          {/* Location Button */}
          <div className="flex flex-col items-center p-5 rounded-lg backdrop-blur-sm bg-slate-800/30 text-white text-xs gap-2 hover:bg-slate-800/60">
            <LocationButton />
            <span>Get Your Location</span>
          </div>

          {/* Sun Position Info */}
          <div className="p-3 rounded-lg backdrop-blur-sm bg-slate-800/30 text-white text-xs hover:bg-slate-800/60">
            <div className="space-y-2">
              <p className="text-slate-300">
                {latDMS} {lonDMS}
              </p>
              <p className="text-slate-300">
                Azimuth:{" "}
                <span className="ml-2">
                  {radiansToDegreesForAzimuth(sunPosition.azimuth).toFixed(2)}°
                </span>
              </p>
              <p className="text-slate-300">
                Altitude:{" "}
                <span className="ml-2">
                  {radiansToDegreesForAltitude(sunPosition.altitude).toFixed(2)}
                  °
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
