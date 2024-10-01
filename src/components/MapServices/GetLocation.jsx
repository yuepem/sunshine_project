import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { MapPin } from 'lucide-react';

function LocationComponent({ positionHandler }) {
  // Removed unused state 'position'
  useEffect(() => {
    const success = (position) => {
      positionHandler(position.coords);
    };

    const error = (error) => {
      console.error("Error getting location:", error);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, [positionHandler]);

  const handleGetLocation = () => {
    const success = (position) => {
      positionHandler(position.coords);
    };

    const error = (error) => {
      console.error("Error getting location:", error);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  return (
    <div>
      <Button variant="contained" size="small" onClick={handleGetLocation} >
        <MapPin size={18} className="mr-2" />
        Get Location
      </Button>
    </div>
  );
}

export default LocationComponent;
