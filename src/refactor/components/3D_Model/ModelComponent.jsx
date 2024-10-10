import React, {useEffect} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SkyScene from "./components/Sky";
import Ground from "./components/Ground";
import Coordinates from "./components/Coordinates";
import Compass from "./components/Compass";

import useRenderStore from "../../../stores/renderStore";
import useSunCalcStore from "../../../stores/sunSalcStore";

const ModelComponent = () => {
  const { sunPosition, calculateSunData } = useSunCalcStore();
  const { skyConfig, sunCoordinates } = useRenderStore();

  const {
    distance,
    turbidity,
    rayleigh,
    mieCoefficient,
    mieDirectionalG,
  } = skyConfig;

  useEffect(() => {
    calculateSunData(sunPosition);
  },[sunPosition]);

  return (
    <Canvas camera={{ position: [-5, 0.7, 4] }}>
      {/* Sky Component with passed arguments */}
      <SkyScene
        distance={distance}
        turbidity={turbidity}
        rayleigh={rayleigh}
        mieCoefficient={mieCoefficient}
        mieDirectionalG={mieDirectionalG}
        sunPosition={sunCoordinates}
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
