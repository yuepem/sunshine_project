import * as THREE from "three";

function vectorFromAltitude(sunPosition, vector = new THREE.Vector3()) {
  const { azimuth, altitude } = sunPosition;
  const altitudeRadians = THREE.MathUtils.degToRad(altitude);
  const inclination = 1 - (altitudeRadians + Math.PI / 2) / Math.PI;

  const theta = Math.PI * (inclination - 0.5);
  const phi = 2 * Math.PI * (azimuth - 0.5);

  vector.x = Math.cos(phi);
  vector.y = Math.sin(theta);
  vector.z = Math.sin(phi);

  return vector;
}

function vectorFromInclination(sunPosition, vector = new THREE.Vector3()) {
  const { azimuth, altitude } = sunPosition;
  // tinclination = altitude is because the units are all Radians.
  const inclination = altitude;

  const theta = Math.PI * (inclination - 0.5);
  const phi = 2 * Math.PI * (azimuth - 0.5);

  vector.x = Math.cos(phi);
  vector.y = Math.sin(theta);
  vector.z = Math.sin(phi);

  return vector;
}

function convertSunCoordinates(sunPosition) {
  const { azimuth, altitude } = sunPosition;
  const x = Math.sin(azimuth) * Math.cos(altitude);
  const y = Math.cos(altitude) * Math.cos(azimuth);
  const z = Math.cos(altitude);

  return { x, y, z };
}

const DATA = {
  Stockholm: { azimuth: -0.010646, altitude: 0.364922 },
  Paris: { azimuth: -0.120353, altitude: 0.391047 },
  Gothenburg: { azimuth: -0.319211, altitude: 0.519043 },
  Taipei: { azimuth: 1.510421, altitude: -0.27845 },
  Sydney: { azimuth: 0.929329, altitude: -0.499909 }
};

const results = {
  Stockholm: { azimuth: "179.39", altitude: "20.91" },
  Paris: { azimuth: "173.10", altitude: "22.41" },
  Gothenburg: { azimuth: "161.71", altitude: "29.74" },
  Taipei: { azimuth: "266.54", altitude: "-15.95" },
  Sydney: { azimuth: "233.25", altitude: "-28.64" }
};

const altitudeValue = vectorFromAltitude(DATA.Taipei);
const inclinationValue = vectorFromInclination(DATA.Taipei);
console.log(
  `altitudeValue: ${altitudeValue.x}, ${altitudeValue.y}, ${altitudeValue.z}`
);
console.log(
  `inclinationValue: ${inclinationValue.x}, ${inclinationValue.y}, ${inclinationValue.z}`
);
