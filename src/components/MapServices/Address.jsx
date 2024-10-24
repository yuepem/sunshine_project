import { useEffect } from "react";
import LocationButton from "./LocationButton";
import useInputStore from "../../stores/inputStore";
import useSunCalcStore from "../../stores/sunSalcStore";
import useTimeStore from "../../stores/timeStore";
import { House } from "lucide-react";
const Address = () => {
  const { address, city, timeZone, toDMS } = useInputStore();
  const {
    sunPosition,
    radiansToDegreesForAzimuth,
    radiansToDegreesForAltitude,
  } = useSunCalcStore();
  const { currentTime, formatTimeZone, startUpdateTime, stopUpdateTime } =
    useTimeStore();

  const latDMS = toDMS().latitude;
  const lonDMS = toDMS().longitude;

  const { date, time, zone } = formatTimeZone(currentTime, timeZone);

  useEffect(() => {
    startUpdateTime();
    return () => stopUpdateTime();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ">
        {/* Address Title */}
        <h1 className="flex items-center text-xs sm:text-sm font-semibold text-white rounded-lg backdrop-blur-sm bg-slate-800/30 py-7 px-3 hover:bg-slate-800/60">
          <House className="mr-3" size={25} />
          <span className="pr-3">{address}</span>
          <LocationButton />
        </h1>

        {/* Time */}
        <div className="flex flex-row items-center justify-between sm:justify-start gap-4">
          <div className="p-3 rounded-lg backdrop-blur-sm bg-slate-800/30 text-white text-xs hover:bg-slate-800/60">
            <div className="space-y-1">
              <p className="text-white">{city ? city : "Local Time"} </p>
              <div className="space-x-3 ">
                <span className="text-slate-300 text-xs">
                  {zone ? zone : ""}
                </span>
                <span className="text-white text-base font-semibold">{time}</span>
              </div>
              <p className="text-slate-300">{date}</p>
            </div>
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
