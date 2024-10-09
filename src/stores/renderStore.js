import { create } from 'zustand'
import useSunCalcStore from './sunSalcStore'

const useRenderStore = create((set, get) => ({
    sunCoordinates: {
        x: 0,
        y: 0,
        z: 0
    },

    setSunCoordinates: () => {
        const { sunPosition } = useSunCalcStore.getState();
        const { azimuth, altitude  } = sunPosition;
        const x = Math.sin(azimuth) * Math.cos(altitude);
        const y = Math.cos(altitude) * Math.cos(azimuth);
        const z = Math.cos(altitude) ;

        set({ sunCoordinates: { x, y, z } });
    },

}))

export default useRenderStore;