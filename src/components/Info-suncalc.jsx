import React, { useState, useEffect } from 'react';
import SunCalc from 'suncalc';

const SunCalcComponent = () => {
  const [data, setData] = useState(null);
  const [latitude, setLatitude] = useState(59.32518); // Default latitude city: Stockholm
  const [longitude, setLongitude] = useState(18.07131); // Default longitude
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Calculate sun data
    const sunTimes = SunCalc.getTimes(date, latitude, longitude);
    const sunPosition = SunCalc.getPosition(date, latitude, longitude);

    setData({
      sunTimes,
      sunPosition,
    });
  }, [date, latitude, longitude]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const formatTime = (date) => (date ? date.toLocaleTimeString() : 'N/A');
  const radiansToDegrees = (rad) => (rad * 180) / Math.PI;

  return (
    <div>
      <h1 className='text-2xl font-semibold text-green-900'>Sun Data</h1>
      <p className='my-2'>Local-Time: {date.toLocaleTimeString()}</p>

      <div className='my-2'>
        <label>
          Date:{' '}
          <input
            type="date"
            value={date.toISOString().substr(0, 10)}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </label>
        <label>
          Latitude:{' '}
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Longitude:{' '}
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(parseFloat(e.target.value))}
          />
        </label>
      </div>

      <h2 className='text-2xl font-semibold text-green-900'>Sun Times</h2>
      <ul className='my-2 '>
        {Object.entries(data.sunTimes).map(([key, value]) => (
          <li key={key}>
            {key}: {formatTime(value)}
          </li>
        ))}
      </ul>

      <h2 className='text-2xl font-semibold text-green-900'>Sun Position</h2>
      <p>Azimuth: {radiansToDegrees(data.sunPosition.azimuth).toFixed(2)}°</p>
      <p>Altitude: {radiansToDegrees(data.sunPosition.altitude).toFixed(2)}°</p>
      
    </div>
  );
};

export default SunCalcComponent;
