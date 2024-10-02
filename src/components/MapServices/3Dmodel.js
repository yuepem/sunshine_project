import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/assets/scene.gltf');
  return <primitive object={scene} />;
}

export default function GLTFViewer() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <Model />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}