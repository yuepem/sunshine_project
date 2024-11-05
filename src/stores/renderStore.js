import { create } from 'zustand'


const useRenderStore = create((set, get) => ({
    sunCoordinates: {
        x: 1,
        y: 0,
        z: 0
    },
    cameraPosition: { x: -5, y: 1, z: 4 },

    skyConfig: {
        distance: 1000,
        turbidity: 5,
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

        // Adjust azimuth to match radiansToDegreesForAzimuth function
        // Original Azimuth North is 180/-180, East is 90 and South is 0, West is -90
        const adjustedAzimuth = azimuth - Math.PI; // Subtract 180 degrees (in radians)

        const x = clearFloat(Math.cos(altitude) * Math.sin(adjustedAzimuth)) * 10;
        const y = clearFloat(Math.sin(altitude)) * 10;
        const z = clearFloat(-Math.cos(altitude) * Math.cos(adjustedAzimuth)) * 10;

        set({ sunCoordinates: { x, y, z } });
    },

    calculateCameraPosition: (sunPosition) => {

        const { clearFloat } = get();
        const { azimuth } = sunPosition;

        // Add 145 degrees to azimuth for camera view
        const adjustedAzimuth = azimuth - Math.PI + (145 * Math.PI / 180);
        //fixed altitude for camera view, that y = 1
        const altitude = 0.1;

        const x = clearFloat(Math.cos(altitude) * Math.sin(adjustedAzimuth)) * 6;
        const y = clearFloat(Math.sin(altitude)) * 6;
        const z = clearFloat(-Math.cos(altitude) * Math.cos(adjustedAzimuth)) * 6;
        
        set({cameraPosition: { x, y, z }});
    },

}))

export default useRenderStore;