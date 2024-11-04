import { Grid } from "@react-three/drei";

export default function Ground() {
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.3,
    // cellColor: "#ffffff",
    sectionSize: 3,
    sectionThickness: 1.2,
    sectionColor: "#5EEAD4",
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  }
    return <Grid   position={[0, -0.01, 0]} args={[50, 50]} {...gridConfig} />
}
