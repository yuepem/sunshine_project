import React from "react";
import Button from "@mui/material/Button";
import { MapPin } from "lucide-react";

const cityCoordinates = {
  "New York": { latitude: 40.7128, longitude: -74.0060 },
  "Paris": { latitude: 48.8567, longitude: 2.3508 },
  "Stockholm": { latitude: 59.3293, longitude: 18.0686 },
  "Tokyo": { latitude: 35.6895, longitude: 139.6917 },
  "Taipei": { latitude: 25.0330, longitude: 121.5654 },
  "Sydney": { latitude: -33.8688, longitude: 151.2093 },
};

const Cities = Object.keys(cityCoordinates);

function LocationComponent({ positionHandler }) {

  const handleCityClick = (city) => {
    const coordinates = cityCoordinates[city];
    if (coordinates) {
      positionHandler(coordinates);
    }
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => positionHandler(position.coords),
      (error) => console.error("Error getting location:", error)
    );
  };

  return (
    <div className="flex justify-between my-6">
      <Button variant="contained" size="small" color="success" className="py-5" onClick={handleGetLocation}>
        <MapPin size={18} className="mr-2" />
        Me
      </Button>
      <div className="flex gap-3">
        {Cities.map((city) => (
          <Button
            key={city}
            variant="contained"
            size="small"
            className="py-5"
            color="info"
            onClick={() => handleCityClick(city)}
          >
            {city}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default LocationComponent;
