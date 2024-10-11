import React from "react";
import Button from "@mui/material/Button";
import { MapPin } from "lucide-react";
import useInputStore from "../../../stores/inputStore";

function LocationButton() {
  const { setLatitude, setLongitude } = useInputStore();

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => console.error("Error getting location:", error)
    );
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        color="success"
        className="py-5"
        onClick={handleGetLocation}
      >
        <MapPin size={18} className="mr-2" />
        Me
      </Button>
    </div>
  );
}

export default LocationButton;
