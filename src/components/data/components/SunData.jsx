import { useState, useEffect } from "react";
import useInputStore from "../../../stores/inputStore";
import useSunCalcStore from "../../../stores/sunSalcStore";

const SunData = () => {
  const { date, latitude, longitude, timeZone } = useInputStore();
  const [toBeHighlighted, setToBeHighlighted] = useState(false);

  const {
    sunTimes,
    sunPosition,
    calculateSunData,
    formatTime,
    formatTimeZone,
    radiansToDegrees,
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
        <p className="my-2 text-orange-700">
          {/* Local-Time: {date.toString("en-US", { hour12: false })} */}
          Local-Time: {date.toLocaleTimeString("en-US", { 
            day: "2-digit",
            month: "short", 
            year: "numeric", 
            hour: "numeric", 
            minute: "2-digit",
            second: "2-digit",
            hour12: false, 
            timeZoneName: 'long', 
           })}
        </p>
        <p className="my-2 text-blue-700">Target Time: {formatTimeZone(date, timeZone)}</p>
      </div>
      <div>
        <h1 className="text-xl font-semibold text-green-900">Sun times in "city"</h1>
        <ul className="grid grid-cols-4 my-2">
          {Object.entries(sunTimes).map(([key, value]) => (
            <li key={key} className="my-2">
              {key}:{" "}
              <span className={`transition-colors ${highlightClass}`}>
                {formatTime(value)}{" "}
              </span>
              {/* <span className={`transition-colors ${highlightClass}`}>
                {value.toString()}{" "}
              </span> */}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1 className="text-xl font-semibold text-green-900">Sun position in "city"</h1>
        <ul className="grid grid-cols-4 my-2">
          {Object.entries(sunPosition).map(([key, value]) => (
            <li key={key} className="my-2">
              {key}:{" "}
              <span className={`transition-colors ${highlightClass}`}>
                {radiansToDegrees(value).toFixed(2)}°{" "}
              </span>
              <span> ({value}) </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SunData;
