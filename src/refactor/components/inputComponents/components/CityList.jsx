import Button from "@mui/material/Button";
import useInputStore from "../../../../stores/inputStore";

const cityCoordinates = {
  "New York": { latitude: 40.7128, longitude: -74.006 },
  Paris: { latitude: 48.8567, longitude: 2.3508 },
  Stockholm: { latitude: 59.3293, longitude: 18.0686 },
  Tokyo: { latitude: 35.6895, longitude: 139.6917 },
  Taipei: { latitude: 25.033, longitude: 121.5654 },
  Sydney: { latitude: -33.8688, longitude: 151.2093 },
  Santiago: { latitude: -33.4489, longitude: -70.6693 },
};

const Cities = Object.keys(cityCoordinates);

function CityList() {
  const { setLatitude, setLongitude } = useInputStore();

  const handleCityClick = (city) => {
    const coordinates = cityCoordinates[city];
    if (coordinates) {
      setLatitude(coordinates.latitude);
      setLongitude(coordinates.longitude);
    }
  };

  return (
    <div className="flex  my-6">
      <div className="flex justify-between gap-3">
        {Cities.map((city) => (
          <Button
            key={city}
            variant="contained"
            size="small"
            className="py-5"
            color="info"
            onClick={() => handleCityClick(city)}
          >
            {city}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CityList;
