import { create } from 'zustand'
import moment from 'moment-timezone'
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

 // this is a simple version for sun's data 
 // Format using Moment.js


  // this is a complicated version for current time
  formatTimeZone: (date, timeZone) => { 
    if (!date) return "N/A";
    return moment(date).tz(timeZone).format('dddd, DD MMMM YYYY HH:mm:ss z'); 
  },
  
  // take East as 0 degrees(+90), (+180)if take North as 0 degree.
  radiansToDegreesForAzimuth: (rad) => (rad * 180) / Math.PI +180, 
  radiansToDegreesForAltitude: (rad) => (rad * 180) / Math.PI,

}));


export default useSunCalcStore;