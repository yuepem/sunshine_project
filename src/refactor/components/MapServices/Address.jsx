import React from "react";
import useInputStore from "../../../stores/inputStore";
const Address = () => {
  const { address } = useInputStore();

  return (
    <div className="py-5 mx-auto max-w-7xl">
      <h2 className="my-2 text-xl font-semibold text-green-900">Address:</h2>
      <p>{address}</p>
      <p></p>
    </div>
  );
};

export default Address;
