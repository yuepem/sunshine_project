import { useEffect } from 'react';
import useTimeStore from '../../stores/timeStore';
import { Clock } from 'lucide-react';

const TimeProgress = () => {
 
  const { currentTime,  startUpdateTime, stopUpdateTime } =
  useTimeStore();


  const localTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  const localDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  useEffect(() => {
    startUpdateTime();
    return () => stopUpdateTime();
  }, []);

  // Calculate width for progress
  const progress = 67;
  const containerStyle = {
    background: `linear-gradient(to right, 
      rgb(226 232 240) 0%, 
      rgb(226 232 240) ${progress}%, 
      rgba(226, 232, 240, 0.3) ${progress}%, 
      rgba(226, 232, 240, 0.3) 100%)`
  };

  return (
    <div className="p-4  space-y-3 rounded-xl bg-slate-800/50 ">
      {/* Time Display */}
      <div className="flex items-baseline space-x-4">
        <div className="text-2xl font-bold text-slate-100">{localTime}</div>
        <div className="text-slate-400">{localDate}</div>
      </div>
      
      {/* Year Progress */}
      <div 
        style={containerStyle}
        className="rounded-lg transition-all duration-500 text-sm p-1"
      >
        <div className="px-3 py-1  flex items-center justify-between">
          <div className="text-slate-800">
            67% of 2024 passed
          </div>
          <div className="flex items-center space-x-2 text-white text-sm">
            <Clock className="w-4 h-4" />
            <span>116 D, 16:56 until 2025 </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeProgress;