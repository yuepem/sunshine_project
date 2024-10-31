import React, { useState, useRef, useEffect } from "react";
import useInputStore from "../../stores/inputStore";
import useTimeStore from "../../stores/timeStore";
import DayPicker from "../input/DayPicker";
import { Calendar as CalendarIcon, Clock as ClockIcon, X as CloseIcon, Building2 } from "lucide-react";

const SimulatorDateTime = () => {
  const { date, timeZone, city } = useInputStore();
  const { formatTime } = useTimeStore();
  const [hiddenDate, setHiddenDate] = useState(true);
  const datePickerRef = useRef(null);
  const buttonRef = useRef(null); // Reference for the date button

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDateClick = () => {
    setHiddenDate(!hiddenDate);
  };

  // Handle click outside and Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        datePickerRef.current && 
        !datePickerRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setHiddenDate(true);
      }
    }

    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        setHiddenDate(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl shadow-xl p-2">
        {/* DateTime Selectors */}
        <div className="grid grid-rows-2 gap-4">

          {/*  City  */}
          <button className="group flex items-center space-x-3 p-2 md:p-2 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors">
            <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
              <Building2 className="w-5 h-5 text-teal-400" />
            </div>
            <div className="text-left">
              <div className="text-sm text-slate-400">City</div>
              <div className="text-slate-200 text-base font-semibold">{city}</div>
            </div>
          </button>

          {/* Date  */}
          <button
            ref={buttonRef}
            onClick={handleDateClick}
            className={`group flex items-center space-x-3 p-2 md:p-2 
                      ${!hiddenDate ? 'bg-slate-700/70' : 'bg-slate-800/50'} 
                      rounded-xl hover:bg-slate-700/50 transition-colors
                      relative`}
          >
            <div className={`p-2 ${!hiddenDate ? 'bg-slate-600' : 'bg-slate-700'} 
                          rounded-lg group-hover:bg-slate-600 transition-colors`}>
              <CalendarIcon className="w-5 h-5 text-teal-400" />
            </div>
            <div className="text-left">
              <div className="text-sm text-slate-400">Date</div>
              <div className="text-slate-200">{formatDate(date)}</div>
            </div>
           
          </button>

          {/* Clock  */}
          <button className="group flex items-center space-x-3 p-2 md:p-2 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors">
            <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
              <ClockIcon className="w-5 h-5 text-teal-400" />
            </div>
            <div className="text-left">
              <div className="text-sm text-slate-400">Time</div>
              <div className="text-slate-200 text-base font-semibold">{formatTime(date, timeZone)}</div>
            </div>
          </button>

          
        </div>
      </div>

      {/* Date Picker Popup */}
      <div 
        ref={datePickerRef} 
        className={`absolute top-0 left-0 w-full transform transition-all duration-200 ease-out
                   ${hiddenDate 
                     ? 'opacity-0 scale-95 -translate-y-4 pointer-events-none' 
                     : 'opacity-100 scale-100 translate-y-0 z-50'}`}
      >
        <div className="bg-gradient-to-b from-slate-800 to-slate-700 rounded-xl 
                      shadow-2xl border border-slate-600/20 backdrop-blur-sm
                      p-4 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-slate-200 font-medium text-lg">Select Date</h3>
              <p className="text-slate-400 text-sm">Choose a date for simulation</p>
            </div>
            <button
              onClick={handleDateClick}
              className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors
                       hover:rotate-90 transform duration-200"
            >
              <CloseIcon className="w-4 h-4 text-slate-400 hover:text-slate-200" />
            </button>
          </div>

          {/* Date Picker */}
          <div className="backdrop-blur-sm rounded-lg">
            <DayPicker />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SimulatorDateTime;