
import useInputStore from "../../../stores/inputStore";


const MonthSelector = () => {
  const { date, setDate } = useInputStore();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = months[date.getMonth()];

  const handleMonthSelect = (monthName) => {
    const newDate = new Date(date);
    const monthIndex = months.indexOf(monthName);
    newDate.setMonth(monthIndex);
    setDate(newDate);
  };


  return (
    <div className="my-2 py-4">
      <div className="w-full bg-blue-50  p-2 rounded-lg">
        <div className="text-sm font-medium mb-2">Monthly</div>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 pb-2">
          {months.map((month) => {
            const isSelected = month === currentMonth;
            return (
              <button
                key={month}
                onClick={() => handleMonthSelect(month)}
                className={`px-auto py-2 text-xs rounded-lg whitespace-nowrap transition-colors 
                ${
                  isSelected
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
