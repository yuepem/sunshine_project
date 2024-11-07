import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Components
import SkyScene from "./components3D/Sky";
import Ground from "./components3D/Ground";
import Coordinates from "./components3D/Coordinates";
import Compass from "./components3D/Compass";
import Sphere from "./components3D/Sphere";

//Object model testing
import Cylinder from "./components3D/House";


// Stores
import useInputStore from "../../stores/inputStore";
import useRenderStore from "../../stores/renderStore";
import useSunCalcStore from "../../stores/sunSalcStore";

const ModelComponent = () => {
  const { date } = useInputStore();
  const { sunPosition, calculateSunData } = useSunCalcStore();
  const { skyConfig, sunCoordinates, cameraPosition, convertSunCoordinates, calculateCameraPosition } = useRenderStore();

  const { distance, turbidity, rayleigh, mieCoefficient, mieDirectionalG } =
    skyConfig;

  const { x, y, z } = sunCoordinates;
  const { x: cameraX, y: cameraY, z: cameraZ } = cameraPosition;


  useEffect(() => {
    calculateSunData(date, sunPosition);
    convertSunCoordinates(sunPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, sunPosition]);

  useEffect(() => {
    calculateCameraPosition(sunPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-[600px] rounded-xl overflow-hidden">
      <Canvas shadows camera={{ position: [cameraX, cameraY, cameraZ]}}>

      
        {/* Directional Light following sun position */}
        <directionalLight
          // position={[x * 10, y * 10, z * 10]}
          position={[x, y, z]}
          /* Show the sun direction even during night */
          intensity={y > 0 ? 1.2 : 0.3}
          castShadow = {y > 0}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-bias={-0.0001}
        />

        {/* Ambient light for overall scene illumination */}
        <ambientLight intensity={0.1} />

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
        <Cylinder />
  
        

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
