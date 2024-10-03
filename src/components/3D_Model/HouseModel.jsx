import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";


function Model({ path }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={1.8} />;
}

function HouseModel() {
  return (
    <div className="p-8 m-5 mx-auto max-w-7xl" style={{ height: "500px" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <Model path="reptar/scene.gltf" />
          <OrbitControls />
        </Suspense>
        <ambientLight  />
        <directionalLight intensity={1} position={[5, 5, 5]} />
        <pointLight position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}

export default HouseModel;
