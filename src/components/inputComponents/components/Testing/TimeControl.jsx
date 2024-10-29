import React, { useState } from 'react';
import { Sun, Moon, Sunrise, Sunset, Calendar as CalendarIcon, Clock as ClockIcon } from 'lucide-react';
import DayPicker from '../DayPicker';

const DateTimePicker = () => {
  const [currentTime, setCurrentTime] = useState('16:54');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hidden, setHidden] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSpeed, setTimeSpeed] = useState('1x');

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

      {/* Timeline Slider with Day/Night Indication */}
      <div className="relative mb-4">
        {/* Day/Night Background */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="h-full bg-slate-700/30" /> {/* Night color */}
          <div 
            className="absolute top-0 h-full bg-gradient-to-r from-yellow-400/20 to-yellow-400/20"
            style={{ 
              left: `${sunrisePos}%`, 
              width: `${sunsetPos - sunrisePos}%` 
            }}
          /> {/* Day color */}
        </div>

        {/* Timeline */}
        <div className="relative h-2">
          <div 
            className="absolute h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
            style={{ width: `${getProgress(currentTime)}%` }}
          />
          
          {/* Time markers */}
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`absolute top-0 w-px h-${i % 6 === 0 ? '3' : '2'} bg-slate-600`}
              style={{ left: `${(i / 24) * 100}%` }}
            />
          ))}

          {/* Current time handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -ml-3"
            style={{ left: `${getProgress(currentTime)}%` }}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-b from-teal-400 to-teal-500 shadow-lg cursor-grab 
              hover:scale-110 transition-transform">
              <div className="absolute inset-1 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Time labels */}
        <div className="flex justify-between mt-2 px-1 text-xs text-slate-500">
          {['00:00', '06:00', '12:00', '18:00', '24:00'].map((time) => (
            <span key={time}>{time}</span>
          ))}
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto
            ${isPlaying 
              ? 'bg-teal-500/20 text-teal-400' 
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}`}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <div className="flex bg-slate-800/50 rounded-lg p-1 w-full sm:w-auto">
          {['0.5x', '1x', '5x', '10x'].map((speed) => (
            <button
              key={speed}
              onClick={() => setTimeSpeed(speed)}
              className={`px-3 py-1.5 text-xs rounded-md transition-all flex-1 sm:flex-none ${
                timeSpeed === speed
                  ? 'bg-teal-500 text-white'
                  : 'text-slate-400 hover:bg-slate-700/50'
              }`}
            >
              {speed}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;