"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Crosshair } from "lucide-react";

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function getDistanceInKm(from, to) {
  const earthRadiusKm = 6371;
  const latitudeDelta = toRadians(to.latitude - from.latitude);
  const longitudeDelta = toRadians(to.longitude - from.longitude);
  const startLatitude = toRadians(from.latitude);
  const endLatitude = toRadians(to.latitude);

  const a =
    Math.sin(latitudeDelta / 2) * Math.sin(latitudeDelta / 2) +
    Math.cos(startLatitude) *
      Math.cos(endLatitude) *
      Math.sin(longitudeDelta / 2) *
      Math.sin(longitudeDelta / 2);

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getNearestLocation(currentPosition, locations) {
  let nearestLocation = locations[0];
  let nearestDistance = Infinity;

  locations.forEach((location) => {
    const distance = getDistanceInKm(currentPosition, location);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestLocation = location;
    }
  });

  return nearestLocation;
}

export default function NearestLocationButton({ locations }) {
  const router = useRouter();
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function handleClick() {
    if (!navigator.geolocation) {
      setStatus("error");
      setMessage("Geolocation is not available in this browser.");
      return;
    }

    setStatus("loading");
    setMessage("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearestLocation = getNearestLocation(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          locations,
        );

        setStatus("ready");
        setMessage(`Opening the closest supported city: ${nearestLocation.name}.`);

        startTransition(() => {
          router.push(`/locations/${nearestLocation.slug}`);
        });
      },
      () => {
        setStatus("error");
        setMessage("We couldn't read your location. Try choosing a city instead.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 300000,
        timeout: 10000,
      },
    );
  }

  return (
    <div className="space-y-3">
      <button type="button" onClick={handleClick} className="btn-secondary w-full">
        <Crosshair className="mr-2 h-4 w-4" />
        {status === "loading" ? "Finding your location" : "Use my current location"}
      </button>
      <p className="text-sm leading-6 text-muted-foreground" aria-live="polite">
        {message || "We'll open the nearest city page from the supported list."}
      </p>
    </div>
  );
}
