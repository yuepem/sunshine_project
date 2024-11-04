// Cylinder.js
import React from "react";
// import { useFrame } from "@react-three/fiber";

function Cylinder({ position = [0, 0.5, 0] }) {
  return (
    <mesh
      position={position}
      castShadow // Enable shadow casting
      receiveShadow // Enable shadow receiving
    >
      <cylinderGeometry args={[0.5, 0.5, 1, 5]} />
      <meshStandardMaterial // Use StandardMaterial instead of BasicMaterial for better lighting
        color={0xE8DCC4}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

export default Cylinder;
