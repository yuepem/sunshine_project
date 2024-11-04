import useTimeStore from "../stores/timeStore";

export default function TimeProgressCalculation() {
  const { currentTime } = useTimeStore.getState();
  // new Date(year, month, day, hours, minutes, seconds)
  const year = currentTime.getFullYear();
  const Start = new Date(year, 0, 1, 0, 0);
  const End = new Date(year, 11, 31, 23, 59);

  const totalTime = End.getTime() - Start.getTime(); // (in milliseconds)

  const timePassed = currentTime.getTime() - Start.getTime();
  const timeLeft = End.getTime() - currentTime.getTime();

  const passedPercent = (timePassed / totalTime) * 100;
  const leftPercent = (timeLeft / totalTime) * 100;

  function convertToTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes
      / 60);
    const days = Math.floor(hours / 24);
    const formatTimeLeft = (days, hours, minutes, seconds) =>
      days === 0 ? `${hours % 24} h ${minutes % 60} m ${seconds % 60} s` :`${days} d ${hours % 24} h ${minutes % 60} m`;


    return formatTimeLeft(days, hours, minutes, seconds);

  }


  const passedTime = convertToTime(timePassed);
  const leftTime = convertToTime(timeLeft);

  return {
    passedPercent,
    leftPercent,
    passedTime,
    leftTime
  }
};