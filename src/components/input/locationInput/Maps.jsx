"use client";

import React, { useEffect, useRef } from "react";
import L, { Icon } from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import useInputStore from "../../../stores/inputStore";
import useSunCalcStore from "../../../stores/sunSalcStore";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

function getEndPoint([startLat, startLng], azimuth, radius) {
  const adjustedAzimuth = azimuth + Math.PI;
  const distance = radius / 111000;

  return [
    startLat + distance * Math.cos(adjustedAzimuth),
    startLng + distance * Math.sin(adjustedAzimuth),
  ];
}

export default function MapsLeaflet() {
  const latitude = useInputStore((state) => state.latitude);
  const longitude = useInputStore((state) => state.longitude);
  const address = useInputStore((state) => state.address);
  const setLatitude = useInputStore((state) => state.setLatitude);
  const setLongitude = useInputStore((state) => state.setLongitude);
  const azimuth = useSunCalcStore((state) => state.sunPosition.azimuth);

  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const ringRef = useRef(null);
  const centerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || mapRef.current) {
      return;
    }

    if (container._leaflet_id) {
      delete container._leaflet_id;
    }

    const map = L.map(container, {
      center: [latitude, longitude],
      zoom: 17,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup(address || "");

    const ring = L.circle([latitude, longitude], {
      radius: 1000,
      color: "teal",
      weight: 2,
      fillColor: "teal",
      fillOpacity: 0.2,
    }).addTo(map);

    const center = L.circleMarker([latitude, longitude], {
      radius: 4,
      color: "yellow",
      fillColor: "#ffd700",
      fillOpacity: 1,
    }).addTo(map);

    const line = L.polyline(
      [[latitude, longitude], getEndPoint([latitude, longitude], azimuth, 1000)],
      {
        color: "teal",
        weight: 2,
        opacity: 1,
      }
    ).addTo(map);

    map.on("click", (event) => {
      setLatitude(event.latlng.lat);
      setLongitude(event.latlng.lng);
      map.setView(event.latlng, map.getZoom());
    });

    mapRef.current = map;
    markerRef.current = marker;
    ringRef.current = ring;
    centerRef.current = center;
    lineRef.current = line;

    return () => {
      lineRef.current = null;
      centerRef.current = null;
      ringRef.current = null;
      markerRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [address, azimuth, latitude, longitude, setLatitude, setLongitude]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    const position = [latitude, longitude];
    const endPoint = getEndPoint(position, azimuth, 1000);

    markerRef.current?.setLatLng(position);
    markerRef.current?.getPopup()?.setContent(address || "");

    ringRef.current?.setLatLng(position);
    centerRef.current?.setLatLng(position);
    lineRef.current?.setLatLngs([position, endPoint]);

    map.setView(position, map.getZoom());
  }, [address, azimuth, latitude, longitude]);

  return (
    <div className="w-full h-full min-h-[250px] rounded-xl overflow-hidden z-[5]">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
