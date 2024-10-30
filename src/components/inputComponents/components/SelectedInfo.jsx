import useInputStore from "../../../stores/inputStore";
import useSunCalcStore from "../../../stores/sunSalcStore";
import useTimeStore from "../../../stores/timeStore";

const SelectedInfo = () => {
  const { date, timeZone, city, address, toDMS } = useInputStore();
  const { formatTimeZone } = useTimeStore();

  const { dateB, time } = formatTimeZone(date, timeZone);
  const {
    sunPosition,
    radiansToDegreesForAzimuth,
    radiansToDegreesForAltitude,
  } = useSunCalcStore();

  const latDMS = toDMS().latitude;
  const lonDMS = toDMS().longitude;

  return (
    <div>
      <h1 className="text-white text-sm font-semibold pb-2">
        The sun's position in
      </h1>
      <div className=" grid grid-flow-row gap-1  md:grid-cols-3 md:gap-2">
        <div className="p-3 rounded-lg backdrop-blur-sm bg-slate-800/30 text-white text-xs space-x-2 hover:bg-slate-800/60">
          <span>{city ? "In" : "At"}</span>
          <span className="text-white text-base ">{city ? city : address}</span>
          <span className="text-slate-300">
            {latDMS} {lonDMS}
          </span>
        </div>
        <div className=" p-3 rounded-lg backdrop-blur-sm bg-slate-800/30 text-white text-xs space-x-2 hover:bg-slate-800/60">
          <span>On</span>
          <span className="text-white text-base ">{dateB}</span>
          <span className="text-slate-300">{time}</span>
        </div>

        {/* Azimuth & Altitude */}
        <div className=" p-3 rounded-lg backdrop-blur-sm bg-slate-800/30 text-white text-sm hover:bg-slate-800/60">
          <div className="space-x-2 flex ">
            {/* <p className="text-slate-300">
              {latDMS} {lonDMS}
            </p> */}
            <p className="text-slate-300 ">
              Azimuth:{" "}
              <span className="ml-2 text-white">
                {radiansToDegreesForAzimuth(sunPosition.azimuth).toFixed(2)}°
              </span>
            </p>
            <p className="text-slate-300">
              Altitude:{" "}
              <span className="ml-2 text-white">
                {radiansToDegreesForAltitude(sunPosition.altitude).toFixed(2)}°
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedInfo;
