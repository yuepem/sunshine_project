
//Testing sunPosition 

// import SunCalc from 'suncalc'
const suncalc = require('suncalc');

function calculateSunData  ({date, latitude, longitude}) {
    if (!date || !latitude || !longitude) {
        return "Missing data: date, latitude, or longitude";
      }

      const sunTimes = suncalc.getTimes(date, latitude, longitude);
      const sunPosition = suncalc.getPosition(date, latitude, longitude);
    
    return {sunTimes, sunPosition}
}

const radiansToDegreesForAzimuth = (rad) => (rad * 180) / Math.PI + 180
const radiansToDegreesForAltitude = (rad) => (rad * 180) / Math.PI 


// usage
const dateToUse = new Date()
const cityCoordinates = {
    "New York": { latitude: 40.7128, longitude: -74.006 },
    Paris: { latitude: 48.8567, longitude: 2.3508 },
    Stockholm: { latitude: 59.3293, longitude: 18.0686 },
    Tokyo: { latitude: 35.6895, longitude: 139.6917 },
    Taipei: { latitude: 25.033, longitude: 121.5654 },
    Sydney: { latitude: -33.8688, longitude: 151.2093 },
    Santiago: { latitude: -33.4489, longitude: -70.6693 },
  };

// const data =  calculateSunData( dateToUse, cityCoordinates.Paris.latitude, cityCoordinates.Paris.longitude );
const data = calculateSunData({ 
  date: dateToUse, 
  latitude: cityCoordinates.Sydney.latitude, 
  longitude: cityCoordinates.Sydney.longitude 
});
// console.log(`latitude: ${data.sunPosition.azimuth}, longitude: ${data.sunPosition.altitude}` )
console.log(data.sunPosition)

const {azimuth, altitude } = data.sunPosition;
const Azi = radiansToDegreesForAzimuth(azimuth).toFixed(2)
const Alt = radiansToDegreesForAltitude(altitude).toFixed(2)
console.log(Alt, Azi)