import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";



const SphereModel = ({ position, args, color}) =>{
    const ref= useRef();

    useFrame((state, delta) => {
        // ref.current.rotation.x += Math.PI / 2
        ref.current.rotation.y += delta 
    })
    return (
        <mesh ref={ref} position={position}>
          <sphereGeometry  args={args}/>
          <meshStandardMaterial color={color} wireframe />
        </mesh>
    )
}

const Sphere = () => {
  return (
    <div className="max-w-7xl, h-1/2">
      <Canvas>
        <directionalLight position={[0, 0, 2]} intensity={1} />
        <SphereModel position={[0, 0, 0]} args={[3, 30, 20]} color="#08C2FF"   />
      </Canvas>
    </div>
  );
};

export default Sphere;
