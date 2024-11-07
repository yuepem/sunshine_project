import useInputStore from "../stores/inputStore";
import React, { useState, useEffect, useRef, useCallback } from "react";
import moment from "moment-timezone";
import { throttle } from "lodash";


const TimeSlider = () => {
  const { date, setDate, timeZone, resetToDefaults } = useInputStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [timeSpeed, setTimeSpeed] = useState(1);
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);
  const dragStartXRef = useRef(null);
  const initialTimeRef = useRef(null);
  const lastDateUpdateRef = useRef(null);
  const isManualChangeRef = useRef(false);

  const formatTimeToMinutes = (date, timeZone) => {
    if (!date) return 0;
    const time = moment(date).tz(timeZone);
    return time.hours() * 60 + time.minutes();
  };

  const [currentTime, setCurrentTime] = useState(() =>
    formatTimeToMinutes(date, timeZone)
  );

  // Throttled time update function
  const updateTimeThrottled = useCallback(
    throttle((newTime) => {
      setCurrentTime(newTime);
    }, 16),
    []
  );

  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
    } else {
      const playSpeed = 100 / timeSpeed;

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
      }, playSpeed);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    }
    resetToDefaults();
  };

  // Convert mouse position to time with bounds checking
  const getTimeFromPosition = useCallback((clientX) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const position = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const percentage = position / rect.width;
    return Math.min(24 * 60 - 1, Math.max(0, Math.round(percentage * 24 * 60)));
  }, []);

  // Calculate time based on drag delta
  const getTimeFromDragDelta = useCallback(
    (clientX) => {
      if (
        !sliderRef.current ||
        dragStartXRef.current === null ||
        initialTimeRef.current === null
      )
        return currentTime;

      const rect = sliderRef.current.getBoundingClientRect();
      const deltaX = clientX - dragStartXRef.current;
      const deltaPercentage = deltaX / rect.width;
      const deltaMinutes = deltaPercentage * 24 * 60;

      return Math.min(
        24 * 60 - 1,
        Math.max(0, Math.round(initialTimeRef.current + deltaMinutes))
      );
    },
    [currentTime]
  );

  const handleMouseDown = useCallback(
    (e) => {
      if (isPlaying) {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
      }

      setIsDragging(true);
      dragStartXRef.current = e.clientX;
      initialTimeRef.current = currentTime;

      document.body.style.cursor = "grabbing";
      e.preventDefault();
    },
    [isPlaying, currentTime]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const newTime = getTimeFromDragDelta(e.clientX);
      updateTimeThrottled(newTime);
    },
    [isDragging, getTimeFromDragDelta, updateTimeThrottled]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStartXRef.current = null;
    initialTimeRef.current = null;
    document.body.style.cursor = "";
  }, []);

  const handleTimelineClick = useCallback(
    (e) => {
      if (isDragging) return;
      isManualChangeRef.current = true; // Set manual change flag
      const time = getTimeFromPosition(e.clientX);
      setCurrentTime(time);
    },
    [isDragging, getTimeFromPosition]
  );

  // Update date when currentTime changes
  useEffect(() => {
    if (isPlaying || isDragging || isManualChangeRef.current) {
      const newDate = moment(date)
        .tz(timeZone)
        .hours(Math.floor(currentTime / 60))
        .minutes(currentTime % 60)
        .toDate();

      // Check if the new date is different from the last update
      if (
        !lastDateUpdateRef.current ||
        lastDateUpdateRef.current.getTime() !== newDate.getTime()
      ) {
        lastDateUpdateRef.current = newDate;
        setDate(newDate);
      }
      isManualChangeRef.current = false; // Reset manual change flag
    }
  }, [currentTime, timeZone]);

  // Update currentTime when date changes (but not during play or drag)
  useEffect(() => {
    const newTime = formatTimeToMinutes(date, timeZone);
    if (newTime !== currentTime) {
      updateTimeThrottled.cancel();
      setCurrentTime(newTime);
    }
  }, [date, timeZone]);

  // Add event listeners
  useEffect(() => {
    if (isDragging) {
      const options = { passive: true };
      window.addEventListener("mousemove", handleMouseMove, options);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mouseleave", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mouseleave", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const progress = (currentTime / (24 * 60)) * 100;

  // Rest of the JSX remains the same...
  return (
    <div className="mx-auto bg-slate-800/80 mb-2 max-w-7xl rounded-lg">
      <div className="w-full p-6  rounded-xl shadow-lg select-none">
        <div className="relative w-full h-16">
          <div
            ref={sliderRef}
            className="absolute w-full h-1.5 bg-slate-700 rounded-full top-4 cursor-pointer
                     transition-all duration-300 ease-out hover:h-2"
            onClick={handleTimelineClick}
          >
            {/* Progress bar */}
            <div
              className="absolute h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
              style={{
                width: `${progress}%`,
                transition: isDragging ? "none" : "width 0.1s ease-out",
              }}
            />

            {/* Slider handle */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 
                       w-5 h-5 bg-white rounded-full flex items-center justify-center 
                       shadow-lg cursor-grab transition-transform duration-150
                       hover:scale-110 active:scale-95
                       ${isDragging ? "cursor-grabbing scale-95" : ""}
                       before:content-[''] before:absolute before:w-3 before:h-3 
                       before:bg-teal-500 before:rounded-full`}
              style={{
                left: `${progress}%`,
                transition: isDragging ? "none" : "all 0.1s ease-out",
              }}
              onMouseDown={handleMouseDown}
            />
          </div>

          {/* Time marks */}
          <div className="absolute w-full flex justify-between top-4 px-2">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className={`absolute top-0 w-px transition-all duration-200
                ${i % 3 === 0 ? "h-3 bg-slate-300" : "h-1.5 bg-slate-300"}`}
                style={{
                  left: `${(i / 24) * 100}%`,
                  opacity: Math.abs((progress / 100) * 24 - i) < 4 ? 1 : 0.5,
                }}
              />
            ))}
          </div>

          {/* Time labels */}
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
                className="text-slate-100 transition-all duration-200"
                style={{
                  opacity: Math.abs((progress / 100) * 8 - index) < 2 ? 1 : 0.5,
                }}
              >
                {time}
              </span>
            ))}
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex flex-row justify-around items-center">
          <div className="flex space-x-4">
            <button
              onClick={togglePlay}
              className={`px-4 py-2 rounded-lg text-xs font-medium
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
            <button
              onClick={handleReset}
              className={`px-4 py-2 rounded-lg text-xs font-medium
                     transition-all duration-300 ease-out transform
                     hover:scale-105 active:scale-95 bg-teal-500/40 text-white hover:bg-teal-500/30`}
            >
              Reset
            </button>
          </div>

          <div className="flex bg-slate-700/30 rounded-lg">
            {[1, 5, 10, 20].map((speed) => (
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
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlider;
