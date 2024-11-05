import { create } from 'zustand'
import SunCalc from 'suncalc'

const useSunCalcStore = create((set, get) => ({
  sunTimes: null,
  sunPosition: {azimuth: 0.5, altitude: 0.5},

  
  calculateSunData: ({date, latitude, longitude }) => {
    
    if (!date || !latitude || !longitude) {
      return "Missing data: date, latitude, or longitude";
    }
    
    const sunTimes = SunCalc.getTimes(date, latitude, longitude);
    const sunPosition = SunCalc.getPosition(date, latitude, longitude);

    set({ sunTimes, sunPosition });
    
  },

  radiansToDegreesForAzimuth: (rad) => (rad * 180) / Math.PI +180, 
  radiansToDegreesForAltitude: (rad) => (rad * 180) / Math.PI,

  // Calculate only sun times for chart
  calculateSuntimesOnly: (date, latitude, longitude) => {
    if (!date || !latitude || !longitude) {
      return "Missing data: date, latitude, or longitude";
    }
    const sunTimes = SunCalc.getTimes(date, latitude, longitude);
    
    return sunTimes;
  }
  
}));


export default useSunCalcStore;