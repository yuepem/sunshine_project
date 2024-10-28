import React, { useState } from 'react';
import { Sun, Moon, Sunrise, Sunset, Calendar as CalendarIcon, Clock as ClockIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const DateTimePicker = () => {
  const [currentTime, setCurrentTime] = useState('16:54');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeView, setActiveView] = useState('main');
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSpeed, setTimeSpeed] = useState('1x');

  const sunEvents = [
    { time: '06:32', type: 'sunrise', label: 'Sunrise', icon: Sunrise, color: 'from-orange-400 to-yellow-400' },
    { time: '12:00', type: 'noon', label: 'Solar Noon', icon: Sun, color: 'from-yellow-400 to-yellow-500' },
    { time: '16:54', type: 'sunset', label: 'Sunset', icon: Sunset, color: 'from-orange-400 to-red-500' },
  ];

  const getProgress = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return ((hours * 60 + minutes) / (24 * 60)) * 100;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-slate-700/50 p-2 rounded-xl">
            {getProgress(currentTime) > getProgress('06:32') && getProgress(currentTime) < getProgress('16:54') 
              ? <Sun className="w-5 h-5 text-yellow-400" />
              : <Moon className="w-5 h-5 text-slate-300" />
            }
          </div>
          <div>
            <h2 className="text-slate-200 text-lg font-medium">Time Controls</h2>
            <p className="text-slate-400 text-sm">Adjust date and time</p>
          </div>
        </div>
        {activeView !== 'main' && (
          <button 
            onClick={() => setActiveView('main')}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-400" />
          </button>
        )}
      </div>

      {activeView === 'main' && (
        <>
          {/* DateTime Selectors */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => setActiveView('calendar')}
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
              onClick={() => setActiveView('time')}
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

          {/* Timeline */}
          <div className="space-y-8">
            {/* Sun Events Cards */}
            <div className="grid grid-cols-3 gap-4">
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
            <div className="relative">
              <div className="h-2 bg-slate-700/50 rounded-full">
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
                  className="absolute top-1/2 -translate-y-1/2 -ml-3 group"
                  style={{ left: `${getProgress(currentTime)}%` }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-b from-teal-400 to-teal-500 shadow-lg cursor-grab 
                    group-hover:scale-110 transition-transform">
                    <div className="absolute inset-1 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              {/* Time labels */}
              <div className="flex justify-between mt-2 px-1">
                {['00:00', '06:00', '12:00', '18:00', '24:00'].map((time) => (
                  <span key={time} className="text-xs text-slate-500">{time}</span>
                ))}
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex justify-center items-center space-x-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isPlaying 
                    ? 'bg-teal-500/20 text-teal-400' 
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}`}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              
              <div className="flex bg-slate-800/50 rounded-lg p-1">
                {['0.5x', '1x', '5x', '10x'].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setTimeSpeed(speed)}
                    className={`px-3 py-1.5 text-xs rounded-md transition-all ${
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
        </>
      )}

      {/* Calendar View */}
      {activeView === 'calendar' && (
        <div className="space-y-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </button>
            <span className="text-slate-200 font-medium">October 2024</span>
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <div key={day} className="text-center text-sm text-slate-400">
                {day}
              </div>
            ))}
            {[...Array(31)].map((_, i) => (
              <button
                key={i}
                className={`p-3 text-sm rounded-lg transition-all ${
                  i === 27
                    ? 'bg-teal-500 text-white'
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Time View */}
      {activeView === 'time' && (
        <div className="flex justify-center space-x-6 py-4">
          <div className="w-20 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50">
            {[...Array(24)].map((_, i) => (
              <button
                key={i}
                className={`w-full p-3 text-sm rounded-lg transition-colors ${
                  i === 16
                    ? 'bg-teal-500 text-white'
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                {i.toString().padStart(2, '0')}
              </button>
            ))}
          </div>
          <div className="w-20 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800/50">
            {[...Array(60)].map((_, i) => (
              <button
                key={i}
                className={`w-full p-3 text-sm rounded-lg transition-colors ${
                  i === 54
                    ? 'bg-teal-500 text-white'
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                {i.toString().padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;