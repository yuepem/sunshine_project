import { Billboard, Text } from "@react-three/drei";

export default function Compass() {
  return (
    <>
      <fog attach="fog" args={["#202025", 0, 80]} />
      <Billboard position={[0, 0.2, -10]}>
        <Text fontSize={0.5} color={'#A02334'} >N</Text>
      </Billboard>

      <Billboard position={[10, 0.2, 0]}>
        <Text fontSize={0.5} color={'#A02334'}>E</Text>
      </Billboard>

      <Billboard position={[0, 0.2, 10]}>
        <Text fontSize={0.5} color={'#A02334'} >S</Text>
      </Billboard>

      <Billboard position={[-10, 0.2, 0]}>
        <Text fontSize={0.5} color={'#A02334'} >W</Text>
      </Billboard>
    </>
  );
}
