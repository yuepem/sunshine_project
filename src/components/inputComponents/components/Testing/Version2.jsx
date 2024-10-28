import React, { useState } from 'react';
import { Clock, Calendar, Sun, Sunrise, Sunset } from 'lucide-react';

const DateTimePicker = () => {
  const [currentTime, setCurrentTime] = useState('16:54');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeView, setActiveView] = useState('main'); // 'main', 'calendar', 'time'

  // Get percentage for timeline
  const getTimePercentage = () => {
    const [hours, minutes] = currentTime.split(':').map(Number);
    return ((hours * 60 + minutes) / (24 * 60)) * 100;
  };

  // Format the date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-lg">
      {/* Main View */}
      {activeView === 'main' && (
        <div className="space-y-6 p-6">
          {/* Current DateTime Display */}
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setActiveView('calendar')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{formatDate(selectedDate)}</span>
            </button>
            <button 
              onClick={() => setActiveView('time')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{currentTime}</span>
            </button>
          </div>

          {/* Quick Time Presets */}
          <div className="flex justify-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100">
              <Sunrise className="w-4 h-4" />
              <span className="text-sm">Sunrise</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100">
              <Sun className="w-4 h-4" />
              <span className="text-sm">Noon</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100">
              <Sunset className="w-4 h-4" />
              <span className="text-sm">Sunset</span>
            </button>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <div className="relative h-16">
              {/* Time markers */}
              <div className="absolute w-full h-1 bg-gray-100 rounded top-6">
                {[...Array(25)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute ${i % 6 === 0 ? 'h-3 -top-1' : 'h-2 top-0'} w-px bg-gray-300`}
                    style={{ left: `${(i / 24) * 100}%` }}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div
                className="absolute h-1 bg-teal-600 rounded top-6"
                style={{ width: `${getTimePercentage()}%` }}
              />

              {/* Handle */}
              <div
                className="absolute top-4 -ml-3 w-6 h-6 bg-white border-2 border-teal-600 rounded-full shadow-lg cursor-grab hover:scale-110 transition-transform"
                style={{ left: `${getTimePercentage()}%` }}
              />

              {/* Time labels */}
              <div className="absolute w-full flex justify-between mt-8">
                {['00:00', '06:00', '12:00', '18:00', '24:00'].map((time) => (
                  <span key={time} className="text-xs text-gray-500">{time}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar View */}
      {activeView === 'calendar' && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Select Date</h3>
            <button 
              onClick={() => setActiveView('main')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Done
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            {[...Array(31)].map((_, i) => (
              <button
                key={i}
                className={`p-2 text-sm rounded-lg hover:bg-teal-50 
                  ${i === 27 ? 'bg-teal-600 text-white hover:bg-teal-700' : 'text-gray-700'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Time View */}
      {activeView === 'time' && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Select Time</h3>
            <button 
              onClick={() => setActiveView('main')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Done
            </button>
          </div>
          <div className="flex justify-center space-x-6">
            {/* Hours */}
            <div className="w-16 h-48 overflow-y-auto">
              {[...Array(24)].map((_, i) => (
                <button
                  key={i}
                  className={`w-full p-2 text-sm rounded-lg
                    ${i === 16 ? 'bg-teal-600 text-white' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  {i.toString().padStart(2, '0')}
                </button>
              ))}
            </div>
            {/* Minutes */}
            <div className="w-16 h-48 overflow-y-auto">
              {[...Array(60)].map((_, i) => (
                <button
                  key={i}
                  className={`w-full p-2 text-sm rounded-lg
                    ${i === 54 ? 'bg-teal-600 text-white' : 'hover:bg-teal-50 text-gray-700'}`}
                >
                  {i.toString().padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;