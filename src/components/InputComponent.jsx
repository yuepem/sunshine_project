import { useEffect } from "react";
import useInputStore from "../stores/inputStore";
import TimeControl from "./input/SunTimes";
import TimeProgress from "./TimeProgress/TimeProgress";

import Maps from "./input/locationInput/Maps";

export default function InputComponent() {
  const getTimeZoneCode = useInputStore((state) => state.getTimeZoneCode);
  const latitude = useInputStore((state) => state.latitude);
  const longitude = useInputStore((state) => state.longitude);

  useEffect(() => {
    getTimeZoneCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  return (
    <div className="mx-auto mb-2 w-full max-w-6xl rounded-lg bg-slate-800/30">
      <div className="grid grid-cols-1 gap-4 rounded-xl p-4 md:grid-cols-2">
        <div className="space-y-3">
          <TimeProgress />
          <TimeControl />
        </div>
        <div className="w-full overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 to-slate-800 p-4 shadow-xl">
          <div className="grid h-full min-h-[24rem] grid-rows-[auto_1fr] gap-2">
            <h2 className="text-slate-200 text-sm font-semibold bg-slate-800/50 rounded-lg p-2  transition-colors">
              Choose A Location From Map
            </h2>
            <div className="w-full h-full overflow-hidden rounded-lg">
              <Maps />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
