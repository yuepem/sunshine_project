import useInputStore from "../../../stores/inputStore";
import React, { useState, useRef } from 'react';

const MonthSelector = () => {
  const { date, setDate } = useInputStore();
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentMonth = months[date.getMonth()];

  // Convert mouse position to month
  const getMonthFromPosition = (clientX) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const position = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, position / rect.width));
    return Math.floor(percentage * 12);
  };

  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(date);
    newDate.setMonth(monthIndex);
    setDate(newDate);
  };

  // Handle mouse/touch interactions
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const monthIndex = getMonthFromPosition(e.clientX);
    handleMonthSelect(monthIndex);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const monthIndex = getMonthFromPosition(e.clientX);
      handleMonthSelect(monthIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle click on timeline
  const handleTimelineClick = (e) => {
    if (!isDragging) {
      const monthIndex = getMonthFromPosition(e.clientX);
      handleMonthSelect(monthIndex);
    }
  };

  // Calculate progress width
  const progress = ((date.getMonth()) / 11) * 100;

  // Add and remove event listeners
  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="my-2 py-4">
      <div className="w-full bg-blue-50 p-4 rounded-lg select-none">
        <div className="text-sm font-medium mb-4">Monthly</div>
        
        {/* Slider Track */}
        <div className="relative w-full h-16 mb-4">
          <div 
            ref={sliderRef}
            className="absolute w-full h-2 bg-gray-200 rounded-full top-8 cursor-pointer"
            onClick={handleTimelineClick}
          >
            {/* Progress bar */}
            <div 
              className="absolute h-full bg-teal-800 rounded-full"
              style={{ width: `${progress}%` }}
            />
            
            {/* Current month indicator */}
            <div 
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 
                bg-teal-800 rounded-full flex items-center justify-center 
                text-white text-xs font-bold shadow-lg cursor-grab
                ${isDragging ? 'cursor-grabbing' : ''}`}
              style={{ left: `${progress}%` }}
              onMouseDown={handleMouseDown}
            >
              NOW
            </div>
          </div>

          {/* Month marks */}
          <div className="absolute w-full flex justify-between top-12 px-2">
            {months.map((month) => (
              <div 
                key={month}
                className="flex flex-col items-center"
              >
                <div className="text-xs text-gray-600">{month.substring(0, 3)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Month buttons grid (keeping your existing grid) */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 pb-2">
          {months.map((month) => {
            const isSelected = month === currentMonth;
            return (
              <button
                key={month}
                onClick={() => handleMonthSelect(months.indexOf(month))}
                className={`px-auto py-2 text-xs rounded-lg whitespace-nowrap transition-colors 
                  ${isSelected
                    ? "bg-teal-800 text-white"
                    : "bg-white hover:bg-gray-50 text-gray-600"
                  }`}
              >
                {month}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthSelector;