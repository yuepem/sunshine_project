import useInputStore from "../../../stores/inputStore";
import React, { useState, useEffect, useRef } from "react";

const TimeSlider = () => {
  const { date, setDate } = useInputStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    date.getHours() * 60 + date.getMinutes()
  );
  const [isDragging, setIsDragging] = useState(false);
  const [timeSpeed, setTimeSpeed] = useState("1x");
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);

  

  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
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
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isDragging]);

  // Calculate progress width
  const progress = (currentTime / (24 * 60)) * 100;

  return (
    <div className="w-full px-2 py-4 mb-4  bg-slate-800/50 rounded-lg select-none">
      <div className="relative w-full h-16 mb-4 ">
        {/* Time track */}
        <div
          ref={sliderRef}
          className="absolute w-full h-2 bg-gray-200 rounded-full top-4 cursor-pointer"
          onClick={handleTimelineClick}
        >
          {/* Progress bar */}
          <div
            className="absolute h-full bg-teal-400 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>

          {/* Current time indicator */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 
              bg-teal-400 rounded-full flex items-center justify-center 
              text-black font-bold shadow-lg cursor-grab
              ${isDragging ? "cursor-grabbing" : ""}`}
            style={{ left: `${progress}%` }}
            onMouseDown={handleMouseDown}
          ></div>
        </div>

        {/* Time marks */}
        <div className="absolute w-full flex justify-between top-4 px-2">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`absolute top-0 w-px h-${
                i % 3 === 0 ? "2" : "1"
              } bg-slate-600`}
              style={{ left: `${(i / 24) * 100}%` }}
            />
          ))}
        </div>

        <div className="absolute w-full flex justify-between  top-6  mt-3 px-1 text-xs text-white">
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
          ].map((time) => (
            <span key={time}>{time}</span>
          ))}
        </div>
      </div>


      {/* Playback Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
        {/* Controls button */}
        <button
          onClick={togglePlay}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto
            ${
              isPlaying
                ? "bg-teal-500/20 text-teal-400"
                : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
            }`}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <div className="flex bg-slate-800/50 rounded-lg p-1 w-full sm:w-auto">
          {["0.5x", "1x", "5x", "10x"].map((speed) => (
            <button
              key={speed}
              onClick={() => setTimeSpeed(speed)}
              className={`px-3 py-1.5 text-xs rounded-md transition-all flex-1 sm:flex-none ${
                timeSpeed === speed
                  ? "bg-teal-500 text-white"
                  : "text-slate-400 hover:bg-slate-700/50"
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
