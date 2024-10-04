import React, { useState, useEffect } from "react";
import SunCalc from "suncalc";
// import Divider from '@mui/material/Divider';
import MapLeaflet from "./MapServices/Maps";
import Button from "@mui/material/Button";

const SunCalcComponent = ({ latitude, longitude }) => {
  const [data, setData] = useState(null);
  const [date] = useState(new Date());
  const [toBeHighlighted, setToBeHighlighted] = useState(false);

  useEffect(() => {
    // Calculate sun data
    const sunTimes = SunCalc.getTimes(date, latitude, longitude);
    const sunPosition = SunCalc.getPosition(date, latitude, longitude);

    setData({
      sunTimes,
      sunPosition,
    });
  }, [date, latitude, longitude]);

  useEffect(() => {
    if (data && data.sunTimes) {
      setToBeHighlighted(true);
      const timer = setTimeout(() => {
        setToBeHighlighted(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [data]);

  const highlightClass = toBeHighlighted
    ? 'animate-[blink_1s_ease-in-out_infinite]'
    : '';

  if (!data) {
    return <div>Loading...</div>;
  }

  const formatTime = (date) =>
    date ? date.toLocaleTimeString("en-US", { hour12: false }) : "N/A";
  const radiansToDegrees = (rad) => (rad * 180) / Math.PI;

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-xl font-semibold text-green-900">Sun Data</h1>
        <p className="my-2">
          Local-Time: {date.toLocaleTimeString("en-US", { hour12: false })}
        </p>

        {/* <div className="my-2">
          <label>
            Date:{" "}
            <input
              type="date"
              value={date.toISOString().slice(0, 10)}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </label>
          <label>
            Latitude:{" "}
            <input
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(parseFloat(e.target.value))}
            />
          </label>
          <label>
            Longitude:{" "}
            <input
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(parseFloat(e.target.value))}
            />
          </label>
        </div> */}

        <h2 className="text-xl font-semibold text-green-900">Sun Times</h2>
        <ul className="grid grid-cols-4 my-2">
          {Object.entries(data.sunTimes).map(([key, value]) => (
            <li key={key} className="my-2">
              {key}:{" "}
              <span className={`transition-colors ${highlightClass}`}>{formatTime(value)} </span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-green-900">Sun Position</h2>
        <p>Azimuth: {radiansToDegrees(data.sunPosition.azimuth).toFixed(2)}°</p>
        <p>
          Altitude: {radiansToDegrees(data.sunPosition.altitude).toFixed(2)}°
        </p>
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
