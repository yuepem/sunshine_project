import React, { useRef  } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import useInputStore from "../../../stores/inputStore";

const libraries = ["places"];

const AddressSearchBar = () => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;
  const autocompleteRef = useRef(null);
  const { setLatitude, setLongitude, } = useInputStore();
 

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (place.geometry) {
        const newLat = place.geometry.location.lat();
        const newLng = place.geometry.location.lng();

        setLatitude(newLat);
        setLongitude(newLng);
      } else {
        console.log("Place has no geometry");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={libraries}
    >
      <Autocomplete
        onLoad={(ref) => (autocompleteRef.current = ref)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
         
          placeholder="Enter your address"
          className=" bg-red-800 px-4 py-2 outline-none text-slate-200 placeholder-slate-400"
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default AddressSearchBar;