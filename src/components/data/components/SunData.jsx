import { useState, useEffect } from "react";
import useInputStore from "../../../stores/inputStore";
import useSunCalcStore from "../../../stores/sunSalcStore";
import useTimeStore from "../../../stores/timeStore";

const SunData = () => {
  const { date, latitude, longitude, timeZone, city } = useInputStore();
  const [toBeHighlighted, setToBeHighlighted] = useState(false);

  const {
    sunTimes,
    sunPosition,
    calculateSunData,
  } = useSunCalcStore();
  
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
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <h1 className="text-xl font-semibold text-green-900 p-4">Sun's Data</h1>
      {/* Refactor component */}
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 mb-36 justify-items-stretch h-60 bg-blue-200 p-4">
        <div className=" text-white rounded-md backdrop-blur-sm bg-slate-800/30 hover:bg-slate-800/60 flex flex-col justify-center items-center">
          1
          
        </div>
        
        <div className=" text-white rounded-md backdrop-blur-sm bg-slate-800/30 hover:bg-slate-800/60 flex justify-center items-center">
          1
        </div>
        <div className=" text-white rounded-md backdrop-blur-sm bg-slate-800/30 hover:bg-slate-800/60 flex justify-center items-center">
          1
        </div>
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
    </div>
  );
};

export default SunData;
