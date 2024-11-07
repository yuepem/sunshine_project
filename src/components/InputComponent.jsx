import { useEffect } from "react";
import useInputStore from "../stores/inputStore";
import TimeControl from "./input/SunTimes";
import TimeProgress from "./TimeProgress/TimeProgress";

import Maps from "./input/locationInput/Maps";

export default function InputComponent() {
  const { getTimeZoneCode, latitude, longitude } = useInputStore();

  useEffect(() => {
    getTimeZoneCode();
  }, [latitude, longitude]);

  return (
    <div className="mx-auto bg-slate-800/30 mb-2 max-w-7xl rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl ">
      <div className="space-y-3">
        <TimeProgress />
        <TimeControl />
      </div>
        <div className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl shadow-xl p-4 overflow-hidden">
          <div className="grid grid-rows-[auto_1fr] h-full gap-2">
            <h1 className="text-slate-200 text-sm font-semibold bg-slate-800/50 rounded-lg p-2  transition-colors">
              Choose A Location From Map
            </h1>
            <div className="w-full h-full overflow-hidden rounded-lg">
              <Maps />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


