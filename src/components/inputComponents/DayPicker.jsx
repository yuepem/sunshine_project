import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import useInputStore from "../../stores/inputStore";

const DayPicker = () => {
  const { date, setDate } = useInputStore();

  const handleDateChange = (newDate) => {
    setDate(newDate.toDate());
  };


  return (
    <div className="w-full rounded-lg">
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DateCalendar
          value={dayjs(date)}
          onChange={handleDateChange}
     
          displayWeekNumber
          views={['month', 'day']}
          sx={{
            '& .MuiPickersDay-root': { color: 'white' }, // Day elements
            '& .MuiPickersCalendarHeader-label': { color: 'white' }, // Month label
            '& .MuiTypography-root': { color: 'white' }, // Week number
            '& .MuiSvgIcon-root': { color: 'white' }, // Week number
            // '& .Mui-DaySelected': { backgroundColor: '#26a69a' }, // Selected day
            '& .Mui-selected': { backgroundColor: '#26a69a' }, // Selected day
            
          }} 
        />
      </LocalizationProvider>
    </div>
  );
};

export default DayPicker;
