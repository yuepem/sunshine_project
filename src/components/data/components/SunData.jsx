import { useState, useEffect } from "react";
import useInputStore from "../../../stores/inputStore";
import useSunCalcStore from "../../../stores/sunSalcStore";
import useTimeStore from "../../../stores/timeStore";

const SunData = () => {
  const { date, latitude, longitude, timeZone, city } = useInputStore();
  const [toBeHighlighted, setToBeHighlighted] = useState(false);

  const { sunTimes, sunPosition, calculateSunData } = useSunCalcStore();

  const { formatTime } = useTimeStore();

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
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-lg text-slate-600">Loading sun data...</p>
      </div>
    );
  }

  const sunTimesData = {
    sunrise: formatTime(sunTimes.sunrise, timeZone),
    sunriseEnd: formatTime(sunTimes.sunriseEnd, timeZone),
    sunsetStart: formatTime(sunTimes.sunsetStart, timeZone),
    sunset: formatTime(sunTimes.sunset, timeZone),
    solarNoon: formatTime(sunTimes.solarNoon, timeZone),
    goldenHour: formatTime(sunTimes.goldenHour, timeZone),
    goldenHourEnd: formatTime(sunTimes.goldenHourEnd, timeZone),
  };

  if (!sunTimes || !sunPosition) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-semibold text-green-900 p-4">Sun's Data</h1>
      {/* Selected sun times */}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(sunTimesData).map(([key, value]) => (
          <li
            key={key}
            className="text-white rounded-md backdrop-blur-sm bg-slate-800/30 hover:bg-slate-800/60 flex flex-col justify-center items-center"
          >
            <span className="font-medium capitalize">{key}: </span>
            <span>{value}</span>
          </li>
        ))}
      </ul>

      {/* Sun Times Display */}
      <div className="mt-8">
        {/* All sun times
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
          {Object.entries(sunTimes).map(([key, value]) => (
            <li key={key} className="p-2 bg-slate-50 rounded-lg">
              <span className="font-medium capitalize">{key}: </span>
              <span className={`transition-colors ${highlightClass}`}>
                {formatTime(value, timeZone)}
              </span>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default SunData;
