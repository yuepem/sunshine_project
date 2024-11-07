import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  CircleMarker,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";


import useInputStore from "../../../stores/inputStore";
import useSunCalcStore from "../../../stores/sunSalcStore";

// Fix for default marker icon
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Component to handle map clicks and updates
const MapController = ({ setLatitude, setLongitude }) => {
  const map = useMap();

  // Handle map clicks
  useMapEvents({
    click(e) {
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
      map.setView(e.latlng, map.getZoom());
    },
  });

  return null;
};

const SunDirectionWithCircle = ({ position, azimuth, radius = 100 }) => {
  // Calculate end point for the line within the circle
  const getEndPoint = (startLat, startLng, azimuthRad, radius) => {
    const adjustedAzimuth = azimuthRad + Math.PI;
    const distance = radius / 111000;

    const latOffset = distance * Math.cos(adjustedAzimuth);
    const lngOffset = distance * Math.sin(adjustedAzimuth);

    return [startLat + latOffset, startLng + lngOffset];
  };

  const endPoint = getEndPoint(position[0], position[1], azimuth, radius);

  return (
    <>
      {/* Circle with radius */}
      <CircleMarker
        center={position}
        radius={radius / 10} // Convert meters to pixels for CircleMarker
        color="teal"
        weight={2}
        fillOpacity={0.2}
      >
        <Popup>
           Azimuth:{" "}
          {((azimuth * 180) / Math.PI + 180).toFixed(2)}°
        </Popup>

        {/* Direction line within the circle */}
        <Polyline
          positions={[position, endPoint]}
          color="teal"
          weight={2}
          opacity={1}
        />
      </CircleMarker>

      {/* Center point */}
      <CircleMarker
        center={position}
        radius={4}
        color="yellow"
        fillColor="#ffd700"
        fillOpacity={1}
      />
    </>
  );
};

const MapsLeaflet = () => {
  const { latitude, longitude, address, setLatitude, setLongitude } =
    useInputStore();
  const { sunPosition } = useSunCalcStore();
  const { azimuth } = sunPosition;
  const position = [latitude, longitude];

  // handle map updates
  const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, map.getZoom());
    }, [map, center]);
    return null;
  };

  return (
    <div className="w-full h-full min-h-[250px]  rounded-xl overflow-hidden z-[5]">
      <MapContainer center={position} zoom={17} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

   
        <Marker position={position}>
          <Popup>{address}</Popup>
        </Marker>
        <MapUpdater center={position} />

        {/* <CircleMarker center={position} radius={100} color="teal">
          <Popup>{address}</Popup>
        </CircleMarker> */}

        <SunDirectionWithCircle
          position={position}
          azimuth={azimuth}
          radius={1000}
        />

        <MapController setLatitude={setLatitude} setLongitude={setLongitude} />
      </MapContainer>
    </div>
  );
};

export default MapsLeaflet;
