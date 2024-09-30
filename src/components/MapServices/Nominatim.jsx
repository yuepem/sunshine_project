import React, { useState, useEffect } from 'react';

const GeocodeComponent = () => {
  const [address, setAddress] = useState('');
  const latitude = 	59.36775;
  const longitude = 17.82128;

  useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        const { city, town, village, state, country, postcode, road, house_number } = data.address;

        // Since some locations may not have 'city', 'town', or 'village', we check for available fields
        const locality = city || town || village || '';
        const simplifiedAddress = [road,house_number, postcode, locality, state, country].filter(Boolean).join(', ');

        setAddress(simplifiedAddress);;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [latitude, longitude]);

  return (
    <div className='bg-slate-200 my-5'>
      <h2 className='text-2xl font-semibold text-green-900 my-2'>Address:</h2>
      <p>{address}</p>
      <p></p>
    </div>
  );
};

export default GeocodeComponent;
