import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Scene from '../assets/Scene';



export default function ModelViewer() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas>
        <Suspense fallback={null}>
          {/* <ambientLight  /> */}
          <spotLight position={[20, 10, 10]} angle={0.15} penumbra={1} />
          <Scene />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}