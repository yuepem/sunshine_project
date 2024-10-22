import React, { useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Sky as SkyImpl } from 'three-stdlib';
import * as THREE from 'three';

// Utility function to clean up floating point precision issues
const cleanFloat = (value) => {
    const rounded = Math.round(value * 10000000) / 10000000;
    return Math.abs(rounded) < 0.0000001 ? 0 : rounded;
};

export function calcPosFromAngles(altitude, azimuth, vector = new THREE.Vector3()) {
    // Convert degrees to radians
    const altitudeRad = THREE.MathUtils.degToRad(altitude);
    const azimuthRad = THREE.MathUtils.degToRad(azimuth);

    // Calculate position for coordinate system where:
    // x (yellow) → east/west
    // y (green) → up/down
    // z (red) → north/south
    vector.x = cleanFloat(Math.cos(altitudeRad) * Math.sin(azimuthRad));
    vector.y = cleanFloat(Math.sin(altitudeRad));
    vector.z = cleanFloat(-Math.cos(altitudeRad) * Math.cos(azimuthRad));

    // Normalize the vector to ensure unit length
    vector.normalize();

    return vector;
}

export const Sky = React.forwardRef(({
    mieDirectionalG = 0.8,
    rayleigh = 0.5,
    turbidity = 10,
    mieCoefficient = 0.005,
    altitude = 0.49,
    azimuth = 0.25,
    distance = 1000,
    ...props
}, ref) => {
    const { scene } = useThree();
    const scale = useMemo(() => new THREE.Vector3().setScalar(distance), [distance]);
    const sunPosition = useMemo(() => calcPosFromAngles(altitude * 180, azimuth * 360), [altitude, azimuth]);

    const sky = useMemo(() => {
        const skyInstance = new SkyImpl();
        scene.add(skyInstance);
        return skyInstance;
    }, [scene]);

    React.useEffect(() => {
        if (sky.material) {
            sky.material.uniforms.mieCoefficient.value = mieCoefficient;
            sky.material.uniforms.mieDirectionalG.value = mieDirectionalG;
            sky.material.uniforms.rayleigh.value = rayleigh;
            sky.material.uniforms.sunPosition.value = sunPosition;
            sky.material.uniforms.turbidity.value = turbidity;
        }
        sky.scale.copy(scale);
    }, [sky, mieCoefficient, mieDirectionalG, rayleigh, sunPosition, turbidity, scale]);

    return null;
});