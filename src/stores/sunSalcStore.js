import { create } from 'zustand'
import SunCalc from 'suncalc'


const useSunCalcStore = create((set, get) => ({
  sunTimes: null,
  sunPosition: null,


  calculateSunData: ({date, latitude, longitude }) => {
    
    if (!date || !latitude || !longitude) {
      return "Missing data: date, latitude, or longitude";
    }
    const sunTimes = SunCalc.getTimes(date, latitude, longitude);
    const sunPosition = SunCalc.getPosition(date, latitude, longitude);

    set({ sunTimes, sunPosition });
  },

  formatTime: (date) => date ? date.toLocaleTimeString("en-US", { hour12: false }) : "N/A",

  formatTimeZone: (date, timeZone) => date ? date.toLocaleString('en-US', { 
    day: "2-digit",
    month: "short", 
    year: "numeric", 
    hour: "numeric", 
    minute: "2-digit",
    second: "2-digit",
    hour12: false, 
    timeZoneName: 'long',  
    timeZone: timeZone }) : "N/A",

  radiansToDegrees: (rad) => (rad * 180) / Math.PI,
}));


export default useSunCalcStore;