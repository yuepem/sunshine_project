import React, { useState, useEffect } from 'react';

import useInputStore from '../../../../stores/inputStore';
import useSunCalcStore from '../../../../stores/sunSalcStore';
import useTimeStore from '../../../../stores/timeStore';

import DayPicker from '../DayPicker';
import TimeSlider from '../TimeSelect2';

import { Sun, Moon, Sunrise, Sunset, Calendar as CalendarIcon, Clock as ClockIcon } from 'lucide-react';

const DateTimePicker = () => {
  const { date, setDate, latitude, longitude } = useInputStore();
  const { sunTimes, calculateSunData } = useSunCalcStore();
  const { timeZone, formatTime } = useTimeStore();

  const [currentTime, setCurrentTime] = useState('16:54');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Calculate sun data
    calculateSunData({ date, latitude, longitude });
  }, [date, latitude, longitude]);
 
  
  // const sunTimesData = {
  //   sunrise: formatTime(sunTimes.sunrise, timeZone),
  //   sunset: formatTime(sunTimes.sunset, timeZone),
  //   solarNoon: formatTime(sunTimes.solarNoon, timeZone),
    
  // };

  const sunEvents = [
    { time: '06:32', type: 'sunrise', label: 'Sunrise', icon: Sunrise, color: 'from-orange-400 to-yellow-400' },
    { time: '12:00', type: 'noon', label: 'Solar Noon', icon: Sun, color: 'from-yellow-400 to-yellow-500' },
    { time: '16:54', type: 'sunset', label: 'Sunset', icon: Sunset, color: 'from-orange-400 to-red-500' },
    { time: '13:20', type: 'daylight', label: 'Daylight', icon: Sun, color: 'from-teal-400 to-teal-500' }
  ];

  const getProgress = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return ((hours * 60 + minutes) / (24 * 60)) * 100;
  };

  // Calculate sunrise and sunset positions for timeline
  const sunrisePos = getProgress('06:32');
  const sunsetPos = getProgress('16:54');

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!sunTimes ) {
    return <div>Loading...</div>;
  }

  
  // Main view
  return (
    <div className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl shadow-xl p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-slate-700/50 p-2 rounded-xl">
            {getProgress(currentTime) > sunrisePos && getProgress(currentTime) < sunsetPos 
              ? <Sun className="w-5 h-5 text-yellow-400" />
              : <Moon className="w-5 h-5 text-slate-300" />
            }
          </div>
          <div>
            <h2 className="text-slate-200 text-lg font-medium">Time Controls</h2>
            <p className="text-slate-400 text-sm">Adjust date and time</p>
          </div>
        </div>
      </div>

      {/* DateTime Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button 
          onClick={() => setHidden(!hidden)}
          className="group flex items-center space-x-3 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors"
        >
          <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
            <CalendarIcon className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-left">
            <div className="text-sm text-slate-400">Date</div>
            <div className="text-slate-200">{formatDate(selectedDate)}</div>
          </div>
        </button>

        <button 
          
          className="group flex items-center space-x-3 p-4 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors"
        >
          <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
            <ClockIcon className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-left">
            <div className="text-sm text-slate-400">Time</div>
            <div className="text-slate-200">{currentTime}</div>
          </div>
        </button>
      </div>

      {/* Date Selector */}
      <div className={`w-full bg-gradient-to-b from-slate-800 to-slate-700 rounded-xl ${hidden ? 'hidden' : ''}`}>
        <DayPicker />
      </div>

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
                <div className="text-lg text-slate-100 font-medium">{event.time}</div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${event.color}`} />
            </div>
          );
        })}
      </div>


      {/* Timeline Slider */}
      <TimeSlider />

      {/* Playback Controls */}
      
    </div>
  );
};

export default DateTimePicker;