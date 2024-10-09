import { Billboard, Text } from "@react-three/drei";

export default function App() {
  return (
    <>
      <fog attach="fog" args={["#202025", 0, 80]} />
      <Billboard position={[0, 0, -10]}>
        <Text fontSize={0.5}>N</Text>
      </Billboard>

      <Billboard position={[0, 0, 10]}>
        <Text fontSize={0.5}>S</Text>
      </Billboard>

      <Billboard position={[10, 0, 0]}>
        <Text fontSize={0.5}>E</Text>
      </Billboard>

      <Billboard position={[-10, 0, 0]}>
        <Text fontSize={0.5}>W</Text>
      </Billboard>
    </>
  );
}
