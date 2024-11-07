import React from "react";
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
    <div >
      <button
        variant="outlined"
        size="small"
        color="white"
        onClick={handleGetLocation}
        className="w-12 h-9 rounded-md flex items-center justify-center"
      >
        <MapPin size={23} className="text-teal-400" />
      </button>
    </div>
  );
}

export default LocationButton;
