import { create } from 'zustand'

const useRenderStore = create((set, get) => ({
    sunCoordinates: {
        x: 1,
        y: 0,
        z: 0
    },

    skyConfig: {
        distance: 1000,
        turbidity: 8,
        rayleigh: 6,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.8,
    },

    clearFloat: (value) => {
        const rounded = Math.round(value * 10000000) / 10000000;
        return Math.abs(rounded) < 0.0000001 ? 0 : rounded;
    },

    convertSunCoordinates: (sunPosition) => {

        const { clearFloat } = get()
        const { azimuth, altitude } = sunPosition;

        // Adjust azimuth to match your radiansToDegreesForAzimuth function
        const adjustedAzimuth = azimuth - Math.PI; // Subtract 180 degrees (in radians)

        const x = clearFloat(Math.cos(altitude) * Math.sin(adjustedAzimuth)) * 10;
        const y = clearFloat(Math.sin(altitude)) * 10;
        const z = clearFloat(-Math.cos(altitude) * Math.cos(adjustedAzimuth)) * 10;

        set({ sunCoordinates: { x, y, z } });
    },


}))

export default useRenderStore;