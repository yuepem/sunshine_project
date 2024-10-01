import React, { useState } from 'react';
import InfoComponent from './components/Info-suncalc';
import GeocodeComponent from './components/MapServices/Nominatim';
// import MapLeaflet from './components/MapServices/Map';
import LocationComponent from './components/MapServices/GetLocation';


function App() {
  const [latitude, setLatitude] = useState(59.36769); // Default latitude (city: Stockholm)
  const [longitude, setLongitude] = useState(17.82157); // Default longitude

  const positionHandler = (position) => {
    setLatitude(position.latitude);
    setLongitude(position.longitude);
  }
  return (
    <div className="p-8 m-5 mx-auto max-w-7xl">
      <h1 className='text-2xl font-bold text-green-900'> Suncalc & Nominatim Input and Data</h1>
        <LocationComponent positionHandler={positionHandler} />
      <div>
        {latitude && longitude ? (
          <p>Latitude: {latitude}, Longitude: {longitude}</p>
        ) : (
          <p>Getting location...</p>
        )}
      </div>
      <GeocodeComponent latitude={latitude} longitude={longitude} />
      <InfoComponent latitude={latitude} longitude={longitude} />
      {/* <MapLeaflet /> */}
    </div>
  );
}

export default App;
