import useInputStore from "../stores/inputStore";
import React, { useState, useEffect, useRef, useCallback } from "react";
import moment from "moment-timezone";
import { throttle } from "lodash";
import Slider from "@mui/material/Slider";

const TimeSliderB = () => {
  const { date, setDate, timeZone, resetToDefaults } = useInputStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSpeed, setTimeSpeed] = useState(1);
  const intervalRef = useRef(null);
  const lastDateUpdateRef = useRef(null);
  const isManualChangeRef = useRef(false);
  const throttledFuncRef = useRef(null);

  // Initialize the throttled function once
  useEffect(() => {
    throttledFuncRef.current = throttle((newTime) => {
      setCurrentTime(newTime);
    }, 16);

    // Cleanup
    return () => {
      if (throttledFuncRef.current?.cancel) {
        throttledFuncRef.current.cancel();
      }
    };
  }, []); // Empty deps array since we only want to create this once

  const formatTimeToMinutes = (date, timeZone) => {
    if (!date) return 0;
    const time = moment(date).tz(timeZone);
    return time.hours() * 60 + time.minutes();
  };

  const [currentTime, setCurrentTime] = useState(() =>
    formatTimeToMinutes(date, timeZone)
  );

  const getCurrentValue = useCallback(() => {
    return (currentTime / (24 * 60)) * 100;
  }, [currentTime]);

  const getTimeFromValue = useCallback((value) => {
    return Math.min(
      24 * 60 - 1,
      Math.max(0, Math.round((value / 100) * 24 * 60))
    );
  }, []);

  // Updated updateTimeThrottled to use the ref
  const updateTimeThrottled = useCallback((newTime) => {
    if (throttledFuncRef.current) {
      throttledFuncRef.current(newTime);
    }
  }, []);

  const handleSliderChange = useCallback(
    (_, newValue) => {
      isManualChangeRef.current = true;
      const newTime = getTimeFromValue(newValue);
      updateTimeThrottled(newTime);
    },
    [getTimeFromValue, updateTimeThrottled]
  );

  const togglePlay = useCallback(() => {
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
  }, [isPlaying, timeSpeed]);

  const handleReset = useCallback(() => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    }
    resetToDefaults();
  }, [isPlaying, resetToDefaults]);

  // Update date when currentTime changes
  useEffect(() => {
    if (isPlaying || isManualChangeRef.current) {
      const newDate = moment(date)
        .tz(timeZone)
        .hours(Math.floor(currentTime / 60))
        .minutes(currentTime % 60)
        .toDate();

      if (
        !lastDateUpdateRef.current ||
        lastDateUpdateRef.current.getTime() !== newDate.getTime()
      ) {
        lastDateUpdateRef.current = newDate;
        setDate(newDate);
      }
      isManualChangeRef.current = false;
    }
  }, [currentTime, date, timeZone, setDate, isPlaying]);

  // Update currentTime when date changes
  useEffect(() => {
    if (!isPlaying && !isManualChangeRef.current) {
      const newTime = formatTimeToMinutes(date, timeZone);
      if (newTime !== currentTime) {
        if (throttledFuncRef.current?.cancel) {
          throttledFuncRef.current.cancel();
        }
        setCurrentTime(newTime);
      }
    }
  }, [date, timeZone, currentTime, isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (throttledFuncRef.current?.cancel) {
        throttledFuncRef.current.cancel();
      }
    };
  }, []);

  return (
    <div className="mx-auto bg-slate-800/80 mb-2 max-w-7xl rounded-lg">
      <div className="w-full p-6 rounded-xl shadow-lg select-none">
        <div className="relative w-full py-2 px-4">
          <Slider
            value={getCurrentValue()}
            onChange={handleSliderChange}
            sx={{
              color: "rgb(20 184 166)",
              height: 8,
              padding: "13px 0",
              "& .MuiSlider-rail": {
                opacity: 0.5,
              },
              "& .MuiSlider-markLabel": {
                color: "#B3B8BD",
              },
            }}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => {
              const minutes = getTimeFromValue(value);
              const hours = Math.floor(minutes / 60);
              const mins = minutes % 60;
              return `${String(hours).padStart(2, "0")}:${String(mins).padStart(
                2,
                "0"
              )}`;
            }}
            marks={[
              { value: 0, label: "00:00" },
              { value: 25, label: "06:00" },
              { value: 50, label: "12:00" },
              { value: 75, label: "18:00" },
              { value: 100, label: "24:00" },
            ]}
          />
        </div>

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
                         : "bg-teal-500/40 text-white hover:bg-teal-500/60"
                     }`}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg text-xs font-medium
                     transition-all duration-300 ease-out transform
                     hover:scale-105 active:scale-95 bg-teal-500/40 text-white hover:bg-teal-500/60"
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
                             ? "bg-teal-500/40 text-white shadow-lg"
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

export default TimeSliderB;
