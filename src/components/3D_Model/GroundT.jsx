import { Grid } from "@react-three/drei";
import { useControls } from "leva";

export default function Ground() {
    const { gridSize, ...gridConfig } = useControls({
        gridSize: [10.5, 10.5],
        cellSize: { value: 0.6, min: 0, max: 10, step: 0.1 },
        cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
        cellColor: '#ffffff',
        sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
        sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
        sectionColor: '#555555',
        fadeDistance: { value: 25, min: 0, max: 100, step: 1 },
        fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
        followCamera: false,
        infiniteGrid: true
      })
    return <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />
}
