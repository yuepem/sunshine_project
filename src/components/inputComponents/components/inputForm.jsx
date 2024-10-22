import React, { useEffect } from "react";
import useInputStore from "../../../stores/inputStore";

const InputForm = () => {
  const {
    date,
    latitude,
    longitude,
    setDate,
    setLatitude,
    setLongitude,
    getAddress,
    getTimeZoneCode,
  } = useInputStore();

  // They are should be called when location is changed, date doesn't matter.
  useEffect(() => {
    // Convert latitude & longitude to address
    getAddress();
    getTimeZoneCode();
  }, [latitude, longitude]);

  return (
    <div className="my-2">
      <label>
        Date:{" "}
        <input
          type="date"
          value={date.toISOString().slice(0, 10)}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </label>
      <label>
        Latitude:{" "}
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(parseFloat(e.target.value))}
        />
      </label>
      <label>
        Longitude:{" "}
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(parseFloat(e.target.value))}
        />
      </label>
    </div>
  );
};

export default InputForm;
