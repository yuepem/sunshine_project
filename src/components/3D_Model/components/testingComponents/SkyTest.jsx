import { Sky } from "@react-three/drei";

const skyConfig = {
    turbidity: 8,
    rayleigh: 6,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    sunPosition: [1, 0, 0]
  }
export default function SkyDefault() {

    return (
        <Sky  turbidity={skyConfig.turbidity}
        rayleigh={skyConfig.rayleigh}
        mieCoefficient={skyConfig.mieCoefficient}
        mieDirectionalG={skyConfig.mieDirectionalG}
        sunPosition={skyConfig.sunPosition}/>
    )
}