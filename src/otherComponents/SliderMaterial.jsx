import { useState, useEffect, useRef } from "react";
import Slider from "@mui/material/Slider";
import moment from "moment-timezone";
import { PlayCircle, PauseCircle } from "lucide-react"; // Import icons

import useInputStore from "../stores/inputStore";

export default function SliderMaterial() {
  const { date, setDate, timeZone } = useInputStore();
  const isSliderMoving = useRef(false);
  const intervalRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeSpeed = 10; // You can adjust this value to change play speed
  const formatTimeToMinutes = (date, timeZone) => {
    if (!date) return new Date();
    const time = moment(date).tz(timeZone);
    return time.hours() * 60 + time.minutes();
  };
  const totalMinutes = formatTimeToMinutes(date, timeZone);
  const progressValue = (totalMinutes / (24 * 60)) * 100;

  const [value, setValue] = useState(progressValue);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // DO NOT update slider value when it is being dragged
    if (!isSliderMoving.current) {
      setValue(progressValue);
      isSliderMoving.current = false;
    }
  }, [date, progressValue]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);

    // Set flag before updating date
    isSliderMoving.current = true;

    const totalMinutes = Math.round((newValue / 100) * 24 * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    // don't need timeZone here, since date is already in local timezone
    const newDate = moment(date).hours(hours).minutes(minutes).toDate();

    setDate(newDate);
  };

  // Handle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
    } else {
      isSliderMoving.current = true;
      const playSpeed = 100 / timeSpeed;

      intervalRef.current = setInterval(() => {
        setValue((prevValue) => {
          const nextValue = prevValue + 0.1;
          if (nextValue >= 24 * 60) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            return 0;
          }

          // Update date based on new slider value
          const totalMinutes = Math.round((nextValue / 100) * 24 * 60);
          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;
          const newDate = moment(date).hours(hours).minutes(minutes).toDate();
          setDate(newDate);

          return nextValue;
        });
      }, playSpeed);
    }
    setIsPlaying(!isPlaying);
  };

  const valuetext = (value) => {
    const totalMinutes = Math.round((value / 100) * 24 * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const timeMarks = [
    {
      value: 0,
      label: "00:00",
    },
    {
      value: 25,
      label: "06:00",
    },
    {
      value: 50,
      label: "12:00",
    },
    {
      value: 75,
      label: "18:00",
    },
    {
      value: 100,
      label: "24:00",
    },
  ];

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={togglePlay}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        {isPlaying ? (
          <PauseCircle className="w-6 h-6" />
        ) : (
          <PlayCircle className="w-6 h-6" />
        )}
      </button>
      <Slider
        value={value}
        onChange={handleSliderChange}
        getAriaLabel={() => "Time"}
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        valueLabelDisplay="auto"
        marks={timeMarks}
        sx={{ color: "teal" }}
      />
    </div>
  );
}
