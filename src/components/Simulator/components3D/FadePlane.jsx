import { Plane } from "@react-three/drei";
import Cylinder from "./House";

export default function FadePlane() {
  return (
    <group>
      <Cylinder receiveShadow />
      <Plane
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        args={[50, 50]}
      >
        <meshStandardMaterial attach="material" color="white" />
      </Plane>
    </group>
  );
}
