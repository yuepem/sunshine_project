import { useEffect } from "react";
import useInputStore from "../../stores/inputStore";
import useTimeStore from "../../stores/timeStore";
import { House, CalendarFold } from "lucide-react";
const Address = () => {
  const { address, city, timeZone } = useInputStore();

  const { currentTime, formatTimeZone, startUpdateTime, stopUpdateTime } =
    useTimeStore();

  const { dateA, time, zone } = formatTimeZone(currentTime, timeZone);

  useEffect(() => {
    startUpdateTime();
    return () => stopUpdateTime();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col  gap-1 ">
        {/* Address Title */}
        <div className="flex items-center px-3 text-xs text-white sm:text-base">
          <House className="mr-3" size={18} />
          <span className="pr-3">{address}</span>
        </div>

        {/* Time */}
        <div className="flex items-center px-3 text-white text-xs ">
          <CalendarFold className="mr-3" size={18} />
          <div className="space-x-2 ">
            <span className="text-white text-base font-semibold">
              {city ? city : "Local"}{" "}
              <span className="text-slate-300 text-xs">Now</span>
            </span>
            <span className="text-white text-base font-semibold">{time}</span>
            <span className="text-slate-300 text-xs">{zone}</span>
            <span className="text-slate-300">{dateA}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
