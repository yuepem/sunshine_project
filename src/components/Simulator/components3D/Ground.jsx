import { Grid } from "@react-three/drei";


export default function Ground() {
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.3,
    sectionSize: 3,
    sectionThickness: 1.2,
    sectionColor: "#5EEAD4",
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };

 
  return (
    <>
      {/* Shadow-receiving plane beneath the grid */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}  receiveShadow>
        <planeGeometry args={[100, 100]} fadeStrength={4}   />
        <meshStandardMaterial
          color={"#5EEAD4"}  
          // color={"#4E02D3"}   
          opacity={0.5}        
          transparent
        />
      </mesh>
      <Grid position={[0, -0.01, 0]} args={[50, 50]} {...gridConfig} />
    </>
  );
}
