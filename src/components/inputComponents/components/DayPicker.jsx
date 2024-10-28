import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import useInputStore from "../../../stores/inputStore";

const DayPicker = () => {
  const { date, setDate } = useInputStore();

  const handleDateChange = (newDate) => {
    setDate(newDate.toDate());
  };

  return (
    <div className="w-full bg-blue-50 rounded-lg">
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DateCalendar
          value={dayjs(date)}
          onChange={handleDateChange}
          displayWeekNumber
        />
      </LocalizationProvider>
    </div>
  );
};

export default DayPicker;
