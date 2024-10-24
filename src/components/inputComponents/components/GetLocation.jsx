import LocationButton from "../../MapServices/LocationButton";
import CityList from "./CityList";

function GetLocation() {
  return (
    <div className="flex flex-col justify-between my-6 p-2">
      {/* <LocationButton /> */}
      <CityList />
    </div>
  );
}

export default GetLocation;
