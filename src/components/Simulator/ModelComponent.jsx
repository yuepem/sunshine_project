import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Components
import SkyScene from "./components3D/Sky";
import Ground from "./components3D/Ground";
import Coordinates from "./components3D/Coordinates";
import Compass from "./components3D/Compass";
import Sphere from "./components3D/Sphere";

//House model testing
import Cylinder from './components3D/House'

// Stores
import useInputStore from "../../stores/inputStore";
import useRenderStore from "../../stores/renderStore";
import useSunCalcStore from "../../stores/sunSalcStore";

const ModelComponent = () => {
  const { date } = useInputStore();
  const { sunPosition, calculateSunData } = useSunCalcStore();
  const { skyConfig, sunCoordinates, convertSunCoordinates } = useRenderStore();

  const { distance, turbidity, rayleigh, mieCoefficient, mieDirectionalG } =
    skyConfig;

  const { x, y, z } = sunCoordinates;

  useEffect(() => {
    calculateSunData(date, sunPosition);
    convertSunCoordinates(sunPosition);
  }, [date, sunPosition]);

  return (
    <div className="h-[600px] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [-5, 0.7, 4] }}>
        {/* Sky Component with passed arguments */}
        <SkyScene
          distance={distance}
          turbidity={turbidity}
          rayleigh={rayleigh}
          mieCoefficient={mieCoefficient}
          mieDirectionalG={mieDirectionalG}
          sunPosition={[x, y, z]}
        />

        <Sphere position={sunCoordinates} />
        <Ground />
        <Coordinates position={sunCoordinates} />
        <Compass />

       {/*  House model testing */}
        <Cylinder  />

        <OrbitControls
          enableRotate={true} // Allow rotation
          autoRotate={true} // Enable auto rotation
          autoRotateSpeed={0} // Adjust rotation speed as needed
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
    </div>
  );
};

export default ModelComponent;
