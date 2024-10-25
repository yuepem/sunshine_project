import  useInputStore  from '../../../stores/inputStore';


import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

const TimeSlider = () => {
  const { date, setDate } = useInputStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(date.getHours() * 60 + date.getMinutes());
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);

  // Convert minutes to display time
  const getDisplayTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  // Generate time marks
  const timeMarks = [];
  for (let hour = 0; hour <= 24; hour++) {
    timeMarks.push({
      time: hour * 60,
      label: `${String(hour).padStart(2, '0')}:00`
    });
  }

  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 24 * 60) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 50);
    }
    setIsPlaying(!isPlaying);
  };

  // Convert mouse position to time
  const getTimeFromPosition = (clientX) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const position = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, position / rect.width));
    return Math.round(percentage * 24 * 60);
  };

  // Handle mouse/touch interactions
  const handleMouseDown = (e) => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    }
    setIsDragging(true);
    const time = getTimeFromPosition(e.clientX);
    setCurrentTime(time);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const time = getTimeFromPosition(e.clientX);
      setCurrentTime(time);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle click on timeline
  const handleTimelineClick = (e) => {
    if (!isDragging) {
      const time = getTimeFromPosition(e.clientX);
      setCurrentTime(time);
    }
  };

  // Update date in store when time changes
  useEffect(() => {
    const newDate = new Date(date);
    newDate.setHours(Math.floor(currentTime / 60));
    newDate.setMinutes(currentTime % 60);
    setDate(newDate);
  }, [currentTime]);

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isDragging]);

  // Calculate progress width
  const progress = (currentTime / (24 * 60)) * 100;

  return (
    <div className="w-full p-4 bg-white rounded-lg select-none">
      <div className="relative w-full h-16">
        {/* Time track */}
        <div 
          ref={sliderRef}
          className="absolute w-full h-2 bg-gray-200 rounded-full top-8 cursor-pointer"
          onClick={handleTimelineClick}
        >
          {/* Progress bar */}
          <div 
            className="absolute h-full bg-yellow-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
          
          {/* Current time indicator */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 
              bg-yellow-400 rounded-full flex items-center justify-center 
              text-black font-bold shadow-lg cursor-grab
              ${isDragging ? 'cursor-grabbing' : ''}`}
            style={{ left: `${progress}%` }}
            onMouseDown={handleMouseDown}
          >
            NOW
          </div>
        </div>

        {/* Time marks */}
        <div className="absolute w-full flex justify-between top-12 px-2">
          {timeMarks.map((mark) => (
            <div 
              key={mark.time}
              className="flex flex-col items-center"
            >
              <div className="text-xs text-gray-600">{mark.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={togglePlay}
          className="p-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors"
        >
          <Play className={`w-6 h-6 ${isPlaying ? 'text-gray-700' : 'text-black'}`} />
        </button>

        <div className="text-lg font-bold">
          {getDisplayTime(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default TimeSlider;


