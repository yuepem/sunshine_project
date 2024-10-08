import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import * as THREE from 'three';
import SkyScene from "./components/Sky";
import Ground from "./components/Ground";
import Coordinates from "./components/Coordinates";
import Compass from "./components/Compass";
// import Gizmo from "./components/Gizmo";

const ModelComponent = (skyConfig) => {
  const { turbidity, rayleigh, mieCoefficient, mieDirectionalG, sunPosition } =
    skyConfig;
  return (
    <Canvas camera={{ position: [-5, 0.7, 4] }}>
      <OrbitControls
        enableRotate= {true} // Allow rotation
        enablePan= {true}     // Allow panning
        enableZoom= {true}    // Allow zooming
        enableDamping= {true} // Add smooth damping to camera movements
        dampingFactor= {0.1}  // Adjust damping factor as needed
        rotateSpeed= {0.5}    // Adjust rotation speed as needed
        panSpeed= {0.5}       // Adjust panning speed as needed
        zoomSpeed= {0.5}      // Adjust zooming speed as needed
        minPolarAngle={Math.PI / 2 } // Restrict vertical rotation (up-down)
        maxPolarAngle={Math.PI / 2} 
        // minAzimuthAngle={Math.PI / 2} // Restrict horizontal rotation
        // maxAzimuthAngle={Math.PI / 2} // Restrict horizontal rotation
        maxDistance={25}
        enableRotateZ={false} 
      />
      
      {/* Sky Component with passed arguments */}
      <SkyScene
        turbidity={turbidity}
        rayleigh={rayleigh}
        mieCoefficient={mieCoefficient}
        mieDirectionalG={mieDirectionalG}
        sunPosition={sunPosition}
      />
      <Ground />
      <Coordinates />
      <Compass />
      {/* <Gizmo /> */}
    </Canvas>
  );
};

export default ModelComponent;
