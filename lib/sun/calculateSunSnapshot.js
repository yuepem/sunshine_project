const SunCalc = require("suncalc");
const moment = require("moment-timezone");

function formatClock(date, timeZone) {
  return moment(date).tz(timeZone).format("HH:mm");
}

function formatDaylightDuration(startDate, endDate) {
  const totalMinutes = Math.max(0, Math.round((endDate - startDate) / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function calculateSunSnapshot({
  latitude,
  longitude,
  timeZone,
  date = new Date(),
}) {
  const sunTimes = SunCalc.getTimes(date, latitude, longitude);
  const sunPosition = SunCalc.getPosition(date, latitude, longitude);
  const altitudeDegrees = (sunPosition.altitude * 180) / Math.PI;
  const azimuthDegrees = (sunPosition.azimuth * 180) / Math.PI + 180;

  return {
    localTime: formatClock(date, timeZone),
    sunrise: formatClock(sunTimes.sunrise, timeZone),
    sunset: formatClock(sunTimes.sunset, timeZone),
    solarNoon: formatClock(sunTimes.solarNoon, timeZone),
    daylightDuration: formatDaylightDuration(sunTimes.sunrise, sunTimes.sunset),
    altitudeDegrees: Number(altitudeDegrees.toFixed(1)),
    azimuthDegrees: Number(azimuthDegrees.toFixed(1)),
    isDaylight: sunPosition.altitude > 0,
  };
}

module.exports = {
  calculateSunSnapshot,
};
