import React, { useState, useEffect } from "react";
import MapLeaflet from "./MapServices/Maps";
import Button from "@mui/material/Button";

// Read {date, latitude, longitude} from inputStore
import useInputStore from "../../stores/inputStore";
// Need Function {calculateSunData, formatTime, radiansToDegrees} from sunSalcStore
import useSunCalcStore from "../../stores/sunSalcStore";

const SunCalcComponent = () => {
  // data from Stores
  const { date, latitude, longitude } = useInputStore();
  const {
    sunTimes,
    sunPosition,
    calculateSunData,
    formatTime,
    radiansToDegrees,
  } = useSunCalcStore();

  // useState
  const [data, setData] = useState(null);
  const [toBeHighlighted, setToBeHighlighted] = useState(false);

  // call calculateSunData when the data change
  useEffect(() => {
    // Calculate sun data
    calculateSunData({ date, latitude, longitude });
    // set data
    setData({ sunTimes, sunPosition });
  }, [date, latitude, longitude]);

  useEffect(() => {
    if (data) {
      setToBeHighlighted(true);
      const timer = setTimeout(() => {
        setToBeHighlighted(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [data]);

  const highlightClass = toBeHighlighted
    ? "animate-[blink_1s_ease-in-out_infinite]"
    : "";

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-xl font-semibold text-green-900">Sun Data</h1>
        <p className="my-2">
          Local-Time: {date.toLocaleTimeString("en-US", { hour12: false })}
        </p>

        <h2 className="text-xl font-semibold text-green-900">Sun Times</h2>
        <ul className="grid grid-cols-4 my-2">
          {Object.entries(data.sunTimes).map(([key, value]) => (
            <li key={key} className="my-2">
              {key}:{" "}
              <span className={`transition-colors ${highlightClass}`}>
                {formatTime(value)}{" "}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-green-900">Sun Position</h2>
        <p>
          Azimuth:{" "}
          <span className={`transition-colors ${highlightClass}`}>
            {radiansToDegrees(data.sunPosition.azimuth).toFixed(2)}°
          </span>
        </p>
        <p>
          Altitude:{" "}
          <span className={`transition-colors ${highlightClass}`}>
            {radiansToDegrees(data.sunPosition.altitude).toFixed(2)}°
          </span>
        </p>
        <p>Azimuth: {data.sunPosition.azimuth}</p>
        <p>Altitude: {data.sunPosition.altitude}</p>
      </div>
      {/* <Divider className="py-3" /> */}
      <div>
        <h2 className="py-3 text-xl font-semibold text-pink-800 ">
          Sunshine Direction module
        </h2>

        <div className="border-2 shadow-xl h-96 rounded-xl flex flex-col overflow-hidden">
          <div className="h-10 flex ">
            <div className="bg-green-200 w-1/2 flex items-center justify-center ">
              <p>Sunshine Direction</p>
            </div>
            <div className="bg-blue-200 w-1/2 flex items-center justify-evenly">
              <p>Enter your address</p>
              <p>Select from map</p>
              <p>Get your location</p>
            </div>
          </div>
          <div className="flex flex-1 ">
            <div className="w-1/2 flex items-center justify-center bg-blue-200 overflow-hidden">
              {/* main component */}
              <MapLeaflet latitude={latitude} longitude={longitude} />
            </div>
            <div className="w-1/2 flex items-center justify-center bg-green-200">
              {/* address input */}
              <Button variant="contained">Get my location</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunCalcComponent;
