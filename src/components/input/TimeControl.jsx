import React from "react";

import useInputStore from "../../stores/inputStore";
import useSunCalcStore from "../../stores/sunSalcStore";
import useTimeStore from "../../stores/timeStore";

import {
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
} from "lucide-react";

const TimeControl = () => {
  const { timeZone } = useInputStore();
  const { sunTimes } = useSunCalcStore();
  const { formatTime } = useTimeStore();

  // const [currentTime, setCurrentTime] = useState('16:54');

  if (!sunTimes) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-lg text-slate-600">Loading sun data...</p>
      </div>
    );
  }

  const sunTimesData = {
    sunrise: formatTime(sunTimes.sunrise, timeZone),
    sunriseEnd: formatTime(sunTimes.sunriseEnd, timeZone),
    sunsetStart: formatTime(sunTimes.sunsetStart, timeZone),
    sunset: formatTime(sunTimes.sunset, timeZone),
    solarNoon: formatTime(sunTimes.solarNoon, timeZone),
    goldenHour: formatTime(sunTimes.goldenHour, timeZone),
    goldenHourEnd: formatTime(sunTimes.goldenHourEnd, timeZone),
  };

  const sunEvents = [
    {
      time: sunTimesData.sunrise,
      type: "sunrise",
      label: "Sunrise",
      icon: Sunrise,
      color: "from-orange-400 to-yellow-400",
    },
    {
      time: sunTimesData.solarNoon,
      type: "noon",
      label: "Solar Noon",
      icon: Sun,
      color: "from-yellow-400 to-yellow-500",
    },
    {
      time: sunTimesData.sunset,
      type: "sunset",
      label: "Sunset",
      icon: Sunset,
      color: "from-orange-400 to-red-500",
    },
    {
      time: "13:20",
      type: "daylight",
      label: "Daylight",
      icon: Sun,
      color: "from-teal-400 to-teal-500",
    },
  ];

  // Calculate sunrise and sunset positions for timeline

  // Main view
  return (
    <div className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl shadow-xl p-4 md:p-6 lg:p-8">
      {/* Header */}
      {/* <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="bg-slate-700/50 p-2 rounded-xl">
            {getProgress(Current_Time) > sunrisePos &&
            getProgress(Current_Time) < sunsetPos ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-300" />
            )}
          </div>
          <div>
            <h2 className="text-slate-200 text-lg font-medium">
              Time Controls
            </h2>
            <p className="text-slate-400 text-sm">Adjust date and time</p>
          </div>
        </div>
      </div> */}

      {/* Sun Events Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {sunEvents.map((event) => {
          const EventIcon = event.icon;
          return (
            <div
              key={event.type}
              className="relative p-4 bg-slate-800/50 rounded-xl overflow-hidden group cursor-pointer hover:bg-slate-700/50 transition-colors"
            >
              <div className="relative z-10">
                <EventIcon className="w-5 h-5 text-white mb-2" />
                <div className="text-sm text-slate-300">{event.label}</div>
                <div className="text-lg text-slate-100 font-medium">
                  {event.time}
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${event.color}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeControl;
