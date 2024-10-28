import React, { useState } from 'react';
import { Clock, Calendar, Sun, ChevronLeft, PlayCircle, PauseCircle } from 'lucide-react';

const DateTimePicker = () => {
  const [currentTime, setCurrentTime] = useState('16:54');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeView, setActiveView] = useState('main');
  const [isPlaying, setIsPlaying] = useState(false);

  const getTimePercentage = () => {
    const [hours, minutes] = currentTime.split(':').map(Number);
    return ((hours * 60 + minutes) / (24 * 60)) * 100;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };

  const timePoints = [
    { time: '06:32', label: 'Sunrise', color: 'bg-orange-500' },
    { time: '12:00', label: 'Solar Noon', color: 'bg-yellow-500' },
    { time: '16:54', label: 'Sunset', color: 'bg-purple-500' }
  ];

  return (
    <div className="w-full max-w-2xl bg-slate-900 rounded-xl shadow-xl p-6 space-y-6">
      {/* Header with navigation */}
      <div className="flex items-center justify-between text-slate-300">
        <button 
          onClick={() => setActiveView('main')}
          className="hover:text-white"
        >
          {activeView !== 'main' && <ChevronLeft className="w-5 h-5" />}
        </button>
        <h2 className="text-lg font-medium">
          {activeView === 'main' ? 'Time Controls' : 
           activeView === 'calendar' ? 'Select Date' : 'Select Time'}
        </h2>
        <div className="w-5" /> {/* Spacer for alignment */}
      </div>

      {/* Main View */}
      {activeView === 'main' && (
        <>
          {/* Current DateTime Display */}
          <div className="flex justify-between items-center space-x-4">
            <button 
              onClick={() => setActiveView('calendar')}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <Calendar className="w-5 h-5 text-slate-400" />
              <span className="text-slate-200">{formatDate(selectedDate)}</span>
            </button>
            <button 
              onClick={() => setActiveView('time')}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <Clock className="w-5 h-5 text-slate-400" />
              <span className="text-slate-200">{currentTime}</span>
            </button>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {/* Play/Pause Control */}
            <div className="flex justify-center">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                {isPlaying ? 
                  <PauseCircle className="w-8 h-8" /> : 
                  <PlayCircle className="w-8 h-8" />
                }
              </button>
            </div>

            {/* Time Markers */}
            <div className="relative h-20">
              {/* Base track */}
              <div className="absolute w-full h-1.5 bg-slate-700 rounded-full top-6">
                {/* Progress */}
                <div 
                  className="absolute h-full bg-teal-500 rounded-full"
                  style={{ width: `${getTimePercentage()}%` }}
                />
                
                {/* Time points */}
                {timePoints.map((point, index) => {
                  const position = ((parseInt(point.time.split(':')[0]) * 60 + 
                                   parseInt(point.time.split(':')[1])) / (24 * 60)) * 100;
                  return (
                    <div
                      key={index}
                      className="absolute -top-4"
                      style={{ left: `${position}%` }}
                    >
                      <div className={`w-3 h-3 ${point.color} rounded-full`} />
                      <div className="mt-8 text-xs text-slate-400 whitespace-nowrap -ml-8">
                        {point.label}
                        <div className="text-slate-500">{point.time}</div>
                      </div>
                    </div>
                  );
                })}

                {/* Handle */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-white rounded-full shadow-lg cursor-grab hover:scale-110 transition-transform"
                  style={{ left: `${getTimePercentage()}%` }}
                >
                  <div className="absolute inset-1 bg-teal-500 rounded-full" />
                </div>
              </div>

              {/* Time labels */}
              <div className="absolute w-full flex justify-between mt-14">
                {['00:00', '06:00', '12:00', '18:00', '24:00'].map((time) => (
                  <span key={time} className="text-xs text-slate-500">{time}</span>
                ))}
              </div>
            </div>

            {/* Speed Control */}
            <div className="flex justify-center space-x-2">
              {['0.5x', '1x', '5x', '10x'].map((speed) => (
                <button
                  key={speed}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors
                    ${speed === '1x' 
                      ? 'bg-teal-500 text-white' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Calendar View */}
      {activeView === 'calendar' && (
        <div className="grid grid-cols-7 gap-2 mt-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} className="text-center text-sm text-slate-400">
              {day}
            </div>
          ))}
          {[...Array(31)].map((_, i) => (
            <button
              key={i}
              className={`p-2 text-sm rounded-lg transition-colors
                ${i === 27 
                  ? 'bg-teal-500 text-white' 
                  : 'text-slate-300 hover:bg-slate-800'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Time View */}
      {activeView === 'time' && (
        <div className="flex justify-center space-x-4 mt-4">
          <div className="w-20 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
            {[...Array(24)].map((_, i) => (
              <button
                key={i}
                className={`w-full p-2 text-sm rounded-lg transition-colors
                  ${i === 16 
                    ? 'bg-teal-500 text-white' 
                    : 'text-slate-300 hover:bg-slate-800'}`}
              >
                {i.toString().padStart(2, '0')}
              </button>
            ))}
          </div>
          <div className="w-20 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
            {[...Array(60)].map((_, i) => (
              <button
                key={i}
                className={`w-full p-2 text-sm rounded-lg transition-colors
                  ${i === 54 
                    ? 'bg-teal-500 text-white' 
                    : 'text-slate-300 hover:bg-slate-800'}`}
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