import { useEffect } from "react";
import  useInputStore  from "../../stores/inputStore.js";
import MonthSelector from "./components/MonthSelector";
import TimeSelector from "./components/TimeSelector";
import MonthPicker from "./components/MonthPicker";



export default function InputComponent() {
  const {date, getAddress, getTimeZoneCode, latitude, longitude } = useInputStore();

  
  useEffect(() => {
    //get time zone code when date and location is changed
    // ! deleted "date" from dependency array, because the time picker automatically run, that would call timeZone API too many. 
    // ! if there is an balance between time picker and time zone API, it can be added back. 
    // date is import is because the Summer time and Winter time will be different.
    getTimeZoneCode();
  }, [latitude, longitude]);

  useEffect(() => {
    // Convert latitude & longitude to address, when latitude & longitude is changed
    getAddress();
  }, [latitude, longitude]);
  return (
    <div className="px-4 mx-auto max-w-7xl bg-teal-600 rounded-lg ">
      <MonthSelector />
      <div className="div">
        <TimeSelector />
        <MonthPicker />
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
