import { create } from 'zustand'
import SunCalc from 'suncalc'
import useInputStore from './inputStore';

const useSunCalcStore = create((set, get) => ({
  sunTimes: null,
  sunPosition: null,


  calculateSunData: () => {
    
    const {date, latitude, longitude } = useInputStore.getState();
    const sunTimes = SunCalc.getTimes(date, latitude, longitude);
    const sunPosition = SunCalc.getPosition(date, latitude, longitude);

    set({ sunTimes, sunPosition });
  },

  formatTime: (date) => date ? date.toLocaleTimeString("en-US", { hour12: false }) : "N/A",

  radiansToDegrees: (rad) => (rad * 180) / Math.PI,
}));


export default useSunCalcStore;