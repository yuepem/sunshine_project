import { useState, useEffect } from "react";
import useInputStore from "../../../stores/inputStore";
import useSunCalcStore from "../../../stores/sunSalcStore";

const SunData = () => {
  const { date, latitude, longitude, timeZone, city } = useInputStore();
  const [toBeHighlighted, setToBeHighlighted] = useState(false);

  const {
    sunTimes,
    sunPosition,
    calculateSunData,
    formatTime,
    formatTimeZone,
  } = useSunCalcStore();

  useEffect(() => {
    // Calculate sun data
    calculateSunData({ date, latitude, longitude });
  }, [date, latitude, longitude]);

  useEffect(() => {
    if (sunTimes && sunPosition) {
      setToBeHighlighted(true);
      const timer = setTimeout(() => {
        setToBeHighlighted(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [sunTimes, sunPosition]);

  const highlightClass = toBeHighlighted
    ? "animate-[blink_1s_ease-in-out_infinite]"
    : "";

  if (!sunTimes || !sunPosition) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1 className="text-xl font-semibold text-green-900">Time</h1>
        <p className="my-2 ">
          {/* Local-Time: {date.toString("en-US", { hour12: false })} */}
          <span className="font-semibold text-blue-500">local</span> Time:{" "}
          {date.toLocaleTimeString("en-US", {
            day: "2-digit",
            month: "short",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZoneName: "short",
          })}
        </p>
        <p className="my-2 ">
          <span className="font-semibold text-blue-500">{city}</span> Time:{" "}
          {formatTimeZone(date, timeZone)} <span>({timeZone})</span>
        </p>
      </div>
      <div>
        <h1 className="text-xl font-semibold text-green-900">
          Sun times in {city}
        </h1>
        <ul className="grid grid-cols-4 my-2">
          {Object.entries(sunTimes).map(([key, value]) => (
            <li key={key} className="my-2">
              {key}:{" "}
              <span className={`transition-colors ${highlightClass}`}>
                {formatTime(value, timeZone)}{" "}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/*  <div>
        <h1 className="text-xl font-semibold text-green-900">Sun position in {city}</h1>
        <div className="grid grid-cols-4 my-2">
          <p>Azimuth:
            <span className={`transition-colors ${highlightClass}`} >{radiansToDegreesForAzimuth(sunPosition.azimuth).toFixed(2)}°  </span>
            <span>({(sunPosition.azimuth).toFixed(6)})</span>
          </p>
          <p>Altitude:
            <span className={`transition-colors ${highlightClass}`}> {radiansToDegreesForAltitude(sunPosition.altitude).toFixed(2)}°</span>
            <span>({(sunPosition.altitude).toFixed(6)})</span>
          </p>
        </div>
      </div> */}
    </>
  );
};

export default SunData;
