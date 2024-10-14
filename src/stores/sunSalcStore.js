import { create } from 'zustand'
import moment from 'moment-timezone'
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

 
  formatTime: (date, timeZone) => { 
    if (!date) return "N/A";
    return moment(date).tz(timeZone).format('HH:mm:ss'); // Format using Moment.js
  },

  formatTimeZone: (date, timeZone) => date ? date.toLocaleString('en-US', { 
    day: "2-digit",
    month: "short", 
    hour: "numeric", 
    minute: "2-digit",
    second: "2-digit",
    hour12: false, 
    timeZoneName: 'short',  
    timeZone: timeZone }) : "N/A",

  radiansToDegrees: (rad) => (rad * 180) / Math.PI,
}));


export default useSunCalcStore;