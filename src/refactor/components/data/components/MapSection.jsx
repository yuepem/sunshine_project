import React from "react";
import MapLeaflet from "../../MapServices/Maps";
import Button from "@mui/material/Button";

// Read {date, latitude, longitude} from inputStore
import useInputStore from "../../../../stores/inputStore";

const MapSection = () => {
  // data from Stores
  const { latitude, longitude } = useInputStore();

  return (
    <div className="mx-auto max-w-7xl bg-stone-100">
      {/* <Divider className="py-3" /> */}
      <div>
        <h2 className="py-3 text-xl font-semibold text-pink-800 ">
          Sunshine Direction module
        </h2>

        <div className="border-2 shadow-xl h-96 rounded-xl flex flex-col overflow-hidden">
          <div className="h-10 flex ">
            <div className="bg-green-200 w-1/2 flex items-center justify-center ">
              <p>Maps</p>
            </div>
            <div className="bg-blue-200 w-1/2 flex items-center justify-evenly">
              <p>Enter your address</p>
              <p>Select from map</p>
              <p>Get your location</p>
            </div>
          </div>
          <div className="flex flex-1 ">
            <div className="w-1/2 flex items-center justify-center bg-blue-200 overflow-hidden">
              {/* main component */}
              <MapLeaflet latitude={latitude} longitude={longitude} />
            </div>
            <div className="w-1/2 flex items-center justify-center bg-green-200">
              {/* address input */}
              <Button variant="contained">Get my location</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
