import { useEffect } from "react";
import useInputStore from "../../stores/inputStore";
import TimeControl from "./TimeControl";

import Maps from "./Maps";

export default function InputComponent() {
  const { getAddress, getTimeZoneCode, latitude, longitude } = useInputStore();

  useEffect(() => {
    //get time zone code when date and location is changed
    // todo deleted "date" from dependency array, because the time picker automatically run, that would call timeZone API too many.
    // todo if there is an balance between time picker and time zone API, it can be added back.
    // date is import is because the Summer time and Winter time will be different.
    getTimeZoneCode();
  }, [latitude, longitude]);

  useEffect(() => {
    // Convert latitude & longitude to address, when latitude & longitude is changed
    getAddress();
  }, [latitude, longitude]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-800/30">
      <TimeControl />
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
  );
}

// todo location input
// 1. get location
// 2. choose location from list
// 3. Choose point from map
// 4. Typing address => convert to latitude & longitude

// todo date input
// 1. Select date
// 2. time choose bar
