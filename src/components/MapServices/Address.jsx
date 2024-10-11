import React from "react";
import useInputStore from "../../stores/inputStore";
const Address = () => {
  const { address, toDMS } = useInputStore();

  const latDMS = toDMS().latitude;
  const lonDMS = toDMS().longitude;

  return (
    <div className="my-5 mx-auto max-w-7xl">
      <h2 className="my-2 text-xl font-semibold text-green-900">
        Current Address:
      </h2>
      <p>{address}</p>
      <div>
        <h2 className="my-2 text-xl font-semibold text-green-900">
          Current Location Coordinates:
        </h2>
        <p>
          Latitude: {latDMS}, <br /> Longitude: {lonDMS}
        </p>
      </div>
    </div>
  );
};

export default Address;
