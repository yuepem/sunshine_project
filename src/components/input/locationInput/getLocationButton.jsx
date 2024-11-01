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
    <div>
      <button
        variant="outlined"
        size="small"
        color="white"
        onClick={handleGetLocation}
        className="w-8 h-8 rounded-md flex items-center justify-center bg-slate-800/40 hover:bg-slate-800/60"
      >
        <MapPin size={20} color="white"/>
      </button>
    </div>
  );
}

export default LocationButton;
