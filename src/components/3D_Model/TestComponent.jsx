import React from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Sky } from './SkyTest';

const TestSky = (inclination, azimuth) => {
  return (
    <Canvas camera={{ position: [-5, 0.7, 4] }}>
      <Sky inclination={inclination} azimuth={azimuth} />
      <OrbitControls />
    </Canvas>
  );
};
export default TestSky;