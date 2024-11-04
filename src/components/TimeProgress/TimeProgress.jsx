import { useEffect } from "react";
import useTimeStore from "../../stores/timeStore";
import timeProgress from "../../helperFunctions/timeProgress";
import { History, Hourglass } from "lucide-react";

const TimeProgress = () => {
  const { currentTime, startUpdateTime, stopUpdateTime } = useTimeStore();

  const localTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const localDate = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    startUpdateTime();
    return () => stopUpdateTime();
  }, []);

  const { leftTime, passedPercent } = timeProgress();

  // Calculate width for progress

  // const containerStyle = {
  //   background: `linear-gradient(to right,
  //    rgba(31,196,177,1) 0%,
  //    rgba(31,196,177,1) ${passedPercent}%,
  //   rgba(54,133,129,1)) ${passedPercent}%,
  //   rgba(54,133,129,1) 100%)`,
  // };
  
  const containerStyle = {
    background: `linear-gradient(to right,
     rgba(54,133,129,1) 0%,
     rgba(54,133,129,1) ${passedPercent}%,
    rgba(31,196,177,1) ${passedPercent}%,
    rgba(31,196,177,1) 100%)`,
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
          <div className="flex items-center space-x-2 text-white text-sm">
            <History className="w-4 h-4" />
            <span>{passedPercent.toFixed(2)} % of 2024 Passed</span>
          </div>
          <div className="flex items-center space-x-2 text-white text-sm">
            <Hourglass className="w-4 h-4" />
            <span>{leftTime} Until 2025 </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeProgress;
