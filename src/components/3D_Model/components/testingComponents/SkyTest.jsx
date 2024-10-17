import React, { useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Sky as SkyImpl } from 'three-stdlib';
import * as THREE from 'three';

export function calcPosFromAngles(altitude, azimuth, vector = new THREE.Vector3()) {
  const altitudeRadians = THREE.MathUtils.degToRad(altitude);
  const inclination = 1 - (altitudeRadians + Math.PI / 2) / Math.PI;

  const theta = Math.PI * (inclination - 0.5);
  const phi = 2 * Math.PI * (azimuth - 0.5);

  vector.x = Math.cos(phi);
  vector.y = Math.sin(theta);
  vector.z = Math.sin(phi);

  return vector;

}

export const Sky = React.forwardRef(({
  mieDirectionalG = 0.8,
  rayleigh = 0.5,
  turbidity = 10,
  mieCoefficient = 0.005,
  altitude = 0.49,
  azimuth = 0.25,
  distance = 1000,
  ...props
}, ref) => {
  const { scene } = useThree();
  const scale = useMemo(() => new THREE.Vector3().setScalar(distance), [distance]);
  const sunPosition = useMemo(() => calcPosFromAngles(altitude, azimuth), [altitude, azimuth]);

  const sky = useMemo(() => {
    const skyInstance = new SkyImpl();
    scene.add(skyInstance);
    return skyInstance;
  }, [scene]);

  React.useEffect(() => {
    if (sky.material) {
      sky.material.uniforms.mieCoefficient.value = mieCoefficient;
      sky.material.uniforms.mieDirectionalG.value = mieDirectionalG;
      sky.material.uniforms.rayleigh.value = rayleigh;
      sky.material.uniforms.sunPosition.value = sunPosition;
      sky.material.uniforms.turbidity.value = turbidity;
    }
    sky.scale.copy(scale);
  }, [sky, mieCoefficient, mieDirectionalG, rayleigh, sunPosition, turbidity, scale]);

  return null;
});