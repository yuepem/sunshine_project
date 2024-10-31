import useInputStore from "../../stores/inputStore";
import useTimeStore from "../../stores/timeStore";
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";


const cityCoordinates = {
  Stockholm: {
    latitude: 59.3293,
    longitude: 18.0686,
    timeZone: "Europe/Stockholm",
  },
  Paris: { latitude: 48.8567, longitude: 2.3508, timeZone: "Europe/Paris" },
  London: { latitude: 51.5074, longitude: 0.1278, timeZone: "Europe/London" },
  "New York": {
    latitude: 40.7128,
    longitude: -74.006,
    timeZone: "America/New_York",
  },
  Tokyo: { latitude: 35.6895, longitude: 139.6917, timeZone: "Asia/Tokyo" },
  Taipei: { latitude: 25.033, longitude: 121.5654, timeZone: "Asia/Taipei" },
  Lisbon: { latitude: 38.7223, longitude: -9.1393, timeZone: "Europe/Lisbon" },
  Santiago: {
    latitude: -33.4489,
    longitude: -70.6693,
    timeZone: "America/Santiago",
  },
  Sydney: {
    latitude: -33.8688,
    longitude: 151.2093,
    timeZone: "Australia/Sydney",
  },
  "New Zealand": {
    latitude: -41.2865,
    longitude: 174.7762,
    timeZone: "Pacific/Auckland",
  },
  Reykjavik: {
    latitude: 64.1466,
    longitude: -21.9426,
    timeZone: "Atlantic/Reykjavik",
  },
  Geneva: { latitude: 46.2044, longitude: 6.1432, timeZone: "Europe/Zurich" },
  Berlin: { latitude: 52.52, longitude: 13.405, timeZone: "Europe/Berlin" },
  Athens: { latitude: 37.9838, longitude: 23.7275, timeZone: "Europe/Athens" },
  Roma: { latitude: 41.9028, longitude: 12.4964, timeZone: "Europe/Rome" },
  Barcelona: {
    latitude: 41.3851,
    longitude: 2.1734,
    timeZone: "Europe/Madrid",
  },
  "Cape Town": {
    latitude: -33.9249,
    longitude: 18.4241,
    timeZone: "Africa/Johannesburg",
  },
  "Mexico City": {
    latitude: 19.4326,
    longitude: -99.1332,
    timeZone: "America/Mexico_City",
  },
  Miami: {
    latitude: 25.7617,
    longitude: -80.1918,
    timeZone: "America/New_York",
  },
  Ottawa: {
    latitude: 45.4215,
    longitude: -75.6972,
    timeZone: "America/Toronto",
  },
  "Los Angeles": {
    latitude: 34.0522,
    longitude: -118.2437,
    timeZone: "America/Los_Angeles",
  },
  Vancouver: {
    latitude: 49.2827,
    longitude: -123.1207,
    timeZone: "America/Vancouver",
  },
  Beijing: {
    latitude: 39.9042,
    longitude: 116.4074,
    timeZone: "Asia/Shanghai",
  },
  Singapore: {
    latitude: 1.3521,
    longitude: 103.8198,
    timeZone: "Asia/Singapore",
  },
  Dubai: { latitude: 25.2048, longitude: 55.2708, timeZone: "Asia/Dubai" },
};

const Cities = Object.keys(cityCoordinates);

function CityList() {
  const { setLatitude, setLongitude } = useInputStore();
  const { currentTime,  startUpdateTime, stopUpdateTime } =
    useTimeStore();
  const scrollContainerRef = useRef(null);
  
  
  useEffect(() => {
    startUpdateTime();
    return () => stopUpdateTime();
  }, []);


  const localTime = (city) => {
    const timeZoneCode = cityCoordinates[city]?.timeZone;

    return currentTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: timeZoneCode,
      hour12: false,
    });
  };

  const handleCityClick = (city) => {
    const coordinates = cityCoordinates[city];
    if (coordinates) {
      setLatitude(coordinates.latitude);
      setLongitude(coordinates.longitude);
      
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust this value to control scroll distance
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };


  return (
    <div className="flex w-full justify-around sticky top-0 ">
      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto  no-scrollbar "
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex space-x-2 py-2">
          {Cities.map((city) => (
            <button
              key={city}
              onClick={() => handleCityClick(city)}
              className="flex-none px-4 py-2 rounded-lg backdrop-blur-sm bg-white/30 text-white hover:bg-slate-700 transition-colors duration-200 "
            >
              <div className="flex items-center">
                {city}
                <span className="ml-1">
                  {localTime(city) > "06:00" && localTime(city) < "18:00" ? (
                    <Sun size={15} />
                  ) : (
                    <Moon size={15} />
                  )}
                </span>
                <span className="ml-1">{localTime(city)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex  py-2 ">
        {/* Left scroll button */}
        <button
          onClick={() => scroll("left")}
          className="transition p-1 text-white  hover:scale-150 "
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        {/* Right scroll button */}
        <button
          onClick={() => scroll("right")}
          className="transition p-1 text-white  hover:scale-150 "
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default CityList;
