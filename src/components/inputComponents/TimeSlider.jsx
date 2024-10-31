import useInputStore from "../../stores/inputStore";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment-timezone";

const TimeSlider = () => {
  const { date, setDate, timeZone } = useInputStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [timeSpeed, setTimeSpeed] = useState("1x");
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);

  const formatTimeToMinutes = (date, timeZone) => {
    if (!date) return 0;
    const time = moment(date).tz(timeZone);
    return time.hours() * 60 + time.minutes();
  };

  const [currentTime, setCurrentTime] = useState(() =>
    formatTimeToMinutes(date, timeZone)
  );

  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const nextTime = prev + 1;
          if (nextTime >= 24 * 60) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            return 0;
          }
          return nextTime;
        });
      }, 50);
    }
    setIsPlaying(!isPlaying);
  };

  // Update date when currentTime changes during play or drag
  useEffect(() => {
    if (isPlaying || isDragging) {
      const newDate = moment(date)
        .tz(timeZone)
        .hours(Math.floor(currentTime / 60))
        .minutes(currentTime % 60);
      setDate(newDate.toDate());
    }
  }, [currentTime]);

  // Update currentTime when date changes (but not during play or drag)
  useEffect(() => {
    if (!isPlaying && !isDragging) {
      const newTime = formatTimeToMinutes(date, timeZone);
      if (newTime !== currentTime) {
        setCurrentTime(newTime);
      }
    }
  }, [date, timeZone]);

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

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Calculate progress based on currentTime
  const progress = (currentTime / (24 * 60)) * 100;

  const formatDisplayTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-full p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg select-none">
      {/* Time Display */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold text-white font-mono tracking-wider">
          {formatDisplayTime(currentTime)}
        </div>
        <div className="text-slate-400 text-sm">
          {moment(date).tz(timeZone).format("MMM D, YYYY")}
        </div>
      </div>

      <div className="relative w-full h-16 mb-6">
        {/* Time track with improved styling */}
        <div
          ref={sliderRef}
          className="absolute w-full h-1.5 bg-slate-700 rounded-full top-4 cursor-pointer
                     transition-all duration-300 ease-out hover:h-2"
          onClick={handleTimelineClick}
        >
          {/* Gradient progress bar with animation */}
          <div
            className="absolute h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full
                       transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>

          {/* Enhanced time indicator */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 
                       w-5 h-5 bg-white rounded-full flex items-center justify-center 
                       shadow-lg cursor-grab transition-transform duration-150
                       hover:scale-110 active:scale-95
                       ${isDragging ? "cursor-grabbing scale-95" : ""}
                       before:content-[''] before:absolute before:w-3 before:h-3 
                       before:bg-teal-500 before:rounded-full`}
            style={{ left: `${progress}%` }}
            onMouseDown={handleMouseDown}
          ></div>
        </div>

        {/* Improved time marks */}
        <div className="absolute w-full flex justify-between top-4 px-2">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`absolute top-0 w-px transition-all duration-200
                ${i % 3 === 0 ? "h-3 bg-slate-500" : "h-1.5 bg-slate-600"}`}
              style={{
                left: `${(i / 24) * 100}%`,
                opacity: Math.abs((progress / 100) * 24 - i) < 4 ? 1 : 0.5,
              }}
            />
          ))}
        </div>

        {/* Enhanced time labels */}
        <div className="absolute w-full flex justify-between top-8 px-1 text-xs">
          {[
            "00:00",
            "03:00",
            "06:00",
            "09:00",
            "12:00",
            "15:00",
            "18:00",
            "21:00",
            "24:00",
          ].map((time, index) => (
            <span
              key={time}
              className="text-slate-400 transition-all duration-200"
              style={{
                opacity: Math.abs((progress / 100) * 8 - index) < 2 ? 1 : 0.5,
              }}
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* Enhanced playback controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
        <button
          onClick={togglePlay}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium
                     transition-all duration-300 ease-out transform
                     hover:scale-105 active:scale-95
                     ${
                       isPlaying
                         ? "bg-teal-500/20 text-teal-400 hover:bg-teal-500/30"
                         : "bg-teal-500 text-white hover:bg-teal-400"
                     }`}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <div className="flex bg-slate-700/30 rounded-lg p-1">
          {["0.5x", "1x", "5x", "10x"].map((speed) => (
            <button
              key={speed}
              onClick={() => setTimeSpeed(speed)}
              className={`px-4 py-2 text-xs rounded-md transition-all duration-200
                         ${
                           timeSpeed === speed
                             ? "bg-teal-500 text-white shadow-lg"
                             : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
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

export default TimeSlider;
