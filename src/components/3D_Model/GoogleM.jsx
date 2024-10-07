// src/components/SkyScene.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';

const SkyScene = ({
  turbidity,
  rayleigh,
  mieCoefficient,
  mieDirectionalG,
  sunPosition,
}) => {
  return (
    <Canvas>
      <OrbitControls />
      
      {/* Sky Component with passed arguments */}
      <Sky
        turbidity={turbidity}
        rayleigh={rayleigh}
        mieCoefficient={mieCoefficient}
        mieDirectionalG={mieDirectionalG}
        sunPosition={sunPosition}
      />
      
      {/* GridHelper for ground grid */}
      <gridHelper args={[20, 20, '#ffffff', '#555555']} />

    
    </Canvas>
  );
};

export default SkyScene;
