import { Segments, Segment } from "@react-three/drei";

export default function Coordinates() {
  return (
    <>
      <Segments lineWidth={2}>
        {/* X Axis */}
        <Segment start={[0, 0, 0]} end={[1.5, 0, 0]} color="yellow" />
        {/* Z Axis */}
        <Segment start={[0, 0, 0]} end={[0, 0, 1.5]} color="red" />
        {/* Y Axis */}
        <Segment start={[0, 0, 0]} end={[0, 1.5, 0]} color="green" />
        {/* -Y Axis  */}
        <Segment start={[0, 0, 0]} end={[0, -1.5, 0]} color="blue" />
      </Segments>
      ;
    </>
  );
}
