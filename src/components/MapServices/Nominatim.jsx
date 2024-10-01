import React, { useState, useEffect } from 'react';

const GeocodeComponent = ({ latitude, longitude }) => {
  const [address, setAddress] = useState('');
 

  useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        const { city, town, village, state, country, postcode, road, house_number } = data.address;

        // Since some locations may not have 'city', 'town', or 'village', we check for available fields
        const locality = city || town || village || '';
        const simplifiedAddress = [road, house_number, postcode, locality, state, country].filter(Boolean).join(', ');

        setAddress(simplifiedAddress);;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [latitude, longitude]);

  return (
    <div className='py-5 mx-auto max-w-7xl'>
      <h2 className='my-2 text-xl font-semibold text-green-900'>Address:</h2>
      <p>{address}</p>
      <p></p>
    </div>
  );
};

export default GeocodeComponent;
