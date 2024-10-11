import LocationButton from "./LocationButton";
import CityList from "./CityList";

function GetLocation() {
  return (
    <div className="flex justify-between my-6">
      <LocationButton />
      <CityList />
    </div>
  );
}

export default GetLocation;
