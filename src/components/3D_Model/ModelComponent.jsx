import React from "react";
import { Canvas } from "@react-three/fiber";
// eslint-disable-next-line
import { OrbitControls } from "@react-three/drei";
import SkyScene from "./components/Sky";
import Ground from "./components/Ground";
import Coordinates from "./components/Coordinates";
import Compass from "./components/Compass";




const ModelComponent = (skyConfig) => {
  const {distance, turbidity, rayleigh, mieCoefficient, mieDirectionalG, sunPosition } =
    skyConfig;
  return (
    <Canvas camera={{ position: [-5, 0.7, 4] }}>
      {/* Sky Component with passed arguments */}
      <SkyScene
        distance={distance}
        turbidity={turbidity}
        rayleigh={rayleigh}
        mieCoefficient={mieCoefficient}
        mieDirectionalG={mieDirectionalG}
        sunPosition={sunPosition}
      />
      <Ground />
      <Coordinates />
      <Compass />
  
      <OrbitControls
        enableRotate={true} // Allow rotation
        enablePan={true} // Allow panning
        enableZoom={true} // Allow zooming
        enableDamping={true} // Add smooth damping to camera movements
        dampingFactor={0.1} // Adjust damping factor as needed
        rotateSpeed={0.2} // Adjust rotation speed as needed
        panSpeed={0.5} // Adjust panning speed as needed
        zoomSpeed={0.5} // Adjust zooming speed as needed
        maxDistance={20}
      />
    </Canvas>
  );
};

export default ModelComponent;
