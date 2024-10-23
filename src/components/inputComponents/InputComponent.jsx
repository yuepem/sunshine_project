import React from "react";
import InputForm from "./components/inputForm";
import GetLocation from "./components/GetLocation";

export default function InputComponent() {
  return (
    <div className="px-4 mx-auto max-w-7xl ">
      <InputForm />
      <GetLocation />
    </div>
  );
}

// todo location input
// 1. get location
// 2. choose location from list
// 3. Choose point from map
// 4. Typing address => convert to latitude & longitude

// todo date input
// 1. Select date
// 2. time choose bar
