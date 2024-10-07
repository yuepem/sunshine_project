import React, { useState } from 'react';
import SunCalcComponent from './components/SunCalc';
import AddressService from './components/MapServices/AddressService';
import GetLocation from './components/MapServices/GetLocation';

import GoogleM from './components/3D_Model/GoogleM';



function App() {
  const [latitude, setLatitude] = useState(59.36769); // Default latitude (city: Stockholm)
  const [longitude, setLongitude] = useState(17.82157); // Default longitude

  const positionHandler = (position) => {
    setLatitude(position.latitude);
    setLongitude(position.longitude);
  }

  // For the 3D model

  const args = {
    turbidity: 8,
    rayleigh: 6,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    sunPosition: [1, 0, 0]
  }

  return (
    <div className="p-8 m-5 mx-auto max-w-7xl">
      <div className="h-[700px]">
        <h1 className='text-2xl font-bold text-green-900'>3D Model</h1>

        <GoogleM {...args} />

      </div>
      <h1 className='text-2xl font-bold text-green-900'> Suncalc & Nominatim Input and Data</h1>
      <GetLocation positionHandler={positionHandler} />
      <div>
        {latitude && longitude ? (
          <p>Latitude: {latitude}, Longitude: {longitude}</p>
        ) : (
          <p>Getting location...</p>
        )}
      </div>
      <AddressService latitude={latitude} longitude={longitude} />
      <SunCalcComponent latitude={latitude} longitude={longitude} />
    </div>
  );
}

export default App;
