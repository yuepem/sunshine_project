import { create } from 'zustand'


const useRenderStore = create((set, get) => ({
    sunCoordinates: {
        x: 0.3070297253484737 ,
        y: 0.7065064962706789,
        z: 0.7703367325528687
    },

    skyConfig: {
        distance: 1000,
        turbidity: 8,
        rayleigh: 6,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.8,
    },



    setSunCoordinates: ({sunPosition}) => {
        
        const { azimuth, altitude } = sunPosition;
        const x = Math.sin(azimuth) * Math.cos(altitude);
        const y = Math.cos(altitude) * Math.cos(azimuth);
        const z = Math.cos(altitude);

        set({ sunCoordinates: { x, y, z } });
        
    },

}))

export default useRenderStore;