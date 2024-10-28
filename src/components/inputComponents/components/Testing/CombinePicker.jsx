import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

const DateTimePicker = () => {
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline', 'calendar', 'time'
  const [currentHour, setCurrentHour] = useState(16); // 24-hour format
  const [currentMinute, setCurrentMinute] = useState(15);

  const formatTime = (hour, minute) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const getTimelinePosition = () => {
    return ((currentHour * 60 + currentMinute) / (24 * 60)) * 100;
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'timeline'
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-gray-500 hover:text-teal-500'
          }`}
        >
          Timeline
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'calendar'
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-gray-500 hover:text-teal-500'
          }`}
        >
          Calendar
        </button>
        <button
          onClick={() => setActiveTab('time')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'time'
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-gray-500 hover:text-teal-500'
          }`}
        >
          Time
        </button>
      </div>

      {/* Timeline View */}
      {activeTab === 'timeline' && (
        <div className="p-4 space-y-4">
          {/* Current Time Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-teal-600" />
              <span className="text-lg font-semibold text-gray-700">
                {formatTime(currentHour, currentMinute)}
              </span>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100">
                Sunrise
              </button>
              <button className="px-3 py-1 text-sm bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100">
                Noon
              </button>
              <button className="px-3 py-1 text-sm bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100">
                Sunset
              </button>
            </div>
          </div>

          {/* Timeline Slider */}
          <div className="relative w-full h-16">
            {/* Background with time markers */}
            <div className="absolute w-full h-2 bg-gray-200 rounded-full top-6">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-3 bg-gray-300"
                  style={{ left: `${(i / 24) * 100}%`, top: '-4px' }}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div
              className="absolute h-2 bg-teal-600 rounded-full top-6"
              style={{ width: `${getTimelinePosition()}%` }}
            />

            {/* Time Handle */}
            <div
              className="absolute top-4 -ml-4 w-8 h-8 bg-white border-2 border-teal-600 rounded-full shadow-lg flex items-center justify-center cursor-grab hover:scale-110 transition-transform"
              style={{ left: `${getTimelinePosition()}%` }}
            >
              <div className="w-2 h-2 bg-teal-600 rounded-full" />
            </div>

            {/* Time Labels */}
            <div className="absolute w-full flex justify-between mt-4 pt-2">
              {[0, 6, 12, 18, 24].map((hour) => (
                <span key={hour} className="text-xs text-gray-500">
                  {hour.toString().padStart(2, '0')}:00
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Calendar View */}
      {activeTab === 'calendar' && (
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-center text-sm text-gray-500 py-2">
                {day}
              </div>
            ))}
            {[...Array(31)].map((_, i) => (
              <button
                key={i}
                className={`p-2 text-sm rounded-full hover:bg-teal-50 
                  ${i === 15 ? 'bg-teal-600 text-white hover:bg-teal-700' : 'text-gray-700'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Time Picker View */}
      {activeTab === 'time' && (
        <div className="p-4">
          <div className="flex justify-center space-x-4">
            {/* Hours */}
            <div className="w-20 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-600 scrollbar-track-gray-100">
              {[...Array(24)].map((_, i) => (
                <button
                  key={i}
                  className={`w-full p-2 text-sm ${
                    i === currentHour
                      ? 'bg-teal-600 text-white'
                      : 'hover:bg-teal-50 text-gray-700'
                  }`}
                  onClick={() => setCurrentHour(i)}
                >
                  {i.toString().padStart(2, '0')}
                </button>
              ))}
            </div>
            {/* Minutes */}
            <div className="w-20 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-600 scrollbar-track-gray-100">
              {[...Array(60)].map((_, i) => (
                <button
                  key={i}
                  className={`w-full p-2 text-sm ${
                    i === currentMinute
                      ? 'bg-teal-600 text-white'
                      : 'hover:bg-teal-50 text-gray-700'
                  }`}
                  onClick={() => setCurrentMinute(i)}
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