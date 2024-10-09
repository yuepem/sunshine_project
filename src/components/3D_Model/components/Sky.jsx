import { Sky } from "@react-three/drei";

const SkyScene = ({
  distance,
  sunPosition, // Position of the sun in the scene (THREE.Vector3)
  turbidity, // Controls the haziness of the atmosphere
  rayleigh, // Controls the amount of Rayleigh scattering (blue color)
  mieCoefficient, // Controls the amount of Mie scattering (brightness and color)
  mieDirectionalG, // Controls the directionality of Mie scattering
}) => {
  return (
    <Sky
    distance={distance}
      turbidity={turbidity}
      rayleigh={rayleigh}
      mieCoefficient={mieCoefficient}
      mieDirectionalG={mieDirectionalG}
      sunPosition={sunPosition}
    />
  );
};

export default SkyScene;
