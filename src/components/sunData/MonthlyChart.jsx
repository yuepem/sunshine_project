import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ReferenceLine,
} from "recharts";
import useSunCalcStore from "../../stores/sunSalcStore";
import useInputStore from "../../stores/inputStore";

// Utility functions
const timeToMinutes = (date) => {
  return date.getHours() * 60 + date.getMinutes();
};

const minutesToTimeString = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

const calculateAverageTime = (timeArray) => {
  if (timeArray.length === 0) return 0;
  const totalMinutes = timeArray.reduce((acc, minutes) => acc + minutes, 0);
  return Math.round(totalMinutes / timeArray.length);
};

// Custom background component for highlighting

const formatTime = (minutes) => {
  return minutesToTimeString(minutes);
};

const MonthlyChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const { calculateSuntimesOnly } = useSunCalcStore();
  const { date, latitude, longitude, setDate } = useInputStore();

  const timeAxisTicks = Array.from({ length: 13 }, (_, i) => i * 2 * 60);
  const getMonthName = (date) => {
    return new Date(date).toLocaleString("default", { month: "long" });
  };
  const getCurrentYear = (date) => {
    return new Date(date).getFullYear();
  };

  // Current month and day for highlighting
  const currentMonth = new Date(date).getMonth();
  const currentDay = new Date(date).getDate();

  useEffect(() => {
    const calculateMonthlySunTimes = () => {
      const data = [];
      const currentYear = new Date(date).getFullYear();

      for (let month = 0; month < 12; month++) {
        const sunriseMinutes = [];
        const sunsetMinutes = [];
        const daysInMonth = new Date(currentYear, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
          const currentDate = new Date(currentYear, month, day);
          const sunData = calculateSuntimesOnly(
            currentDate,
            latitude,
            longitude
          );

          if (
            sunData &&
            sunData !== "Missing data: date, latitude, or longitude"
          ) {
            sunriseMinutes.push(timeToMinutes(sunData.sunrise));
            sunsetMinutes.push(timeToMinutes(sunData.sunset));
          }
        }

        const avgSunrise = calculateAverageTime(sunriseMinutes);
        const avgSunset = calculateAverageTime(sunsetMinutes);

        data.push({
          month: new Date(currentYear, month, 1).toLocaleString("default", {
            month: "short",
          }),
          avgSunrise,
          avgSunset,
          isCurrentMonth: month === currentMonth,
          daylight: avgSunset - avgSunrise,
        });
      }
      setMonthlyData(data);
    };

    calculateMonthlySunTimes();
  }, [calculateSuntimesOnly, latitude, longitude, date, currentMonth]);

  useEffect(() => {
    const calculateDailySunTimes = () => {
      const data = [];
      const currentYear = new Date(date).getFullYear();
      const month = new Date(date).getMonth();
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(currentYear, month, day);
        const sunData = calculateSuntimesOnly(currentDate, latitude, longitude);

        if (
          sunData &&
          sunData !== "Missing data: date, latitude, or longitude"
        ) {
          const sunrise = timeToMinutes(sunData.sunrise);
          const sunset = timeToMinutes(sunData.sunset);

          data.push({
            day,
            sunrise,
            sunset,
            isCurrentDay: day === currentDay,
            daylight: sunset - sunrise,
          });
        }
      }
      setDailyData(data);
    };

    calculateDailySunTimes();
  }, [calculateSuntimesOnly, latitude, longitude, date, currentDay]);

  const handleMonthClick = (data) => {
    if (!data || !data.activePayload) return;
    const clickedMonth = data.activePayload[0].payload;
    const newDate = new Date(date);
    newDate.setMonth(
      monthlyData.findIndex((m) => m.month === clickedMonth.month)
    );
    setDate(newDate);
  };

  const handleDayClick = (data) => {
    if (!data || !data.activePayload) return;
    const clickedDay = data.activePayload[0].payload;
    const newDate = new Date(date);
    newDate.setDate(clickedDay.day);
    setDate(newDate);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const daylight = payload[0].payload.daylight;
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="text-sm font-bold">{`${
            typeof label === "number" ? "Day" : ""
          } ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.stroke }}>
              {`${entry.name}: ${formatTime(entry.value)}`}
            </p>
          ))}
          <p className="text-gray-600 text-sm mt-1">
            Daylight: {formatTime(daylight)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-8 p-4 mx-auto bg-teal-800 mb-2 max-w-7xl rounded-lg">
      <div className="w-full h-96 bg-gradient-to-b from-slate-900 to-slate-800 px-5 pt-5 pb-12 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-300">
            Sun Time Overview in
            <span className="bg-gradient-to-r from-[#3F5EFB] to-[#FC466B] bg-clip-text text-transparent">
              {" "}
              {getCurrentYear(date)}
            </span>
          </h2>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData} onClick={handleMonthClick}>
            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity={0.3}
              vertical={false}
            />
            <XAxis dataKey="month" />
            <YAxis
              tickFormatter={formatTime}
              domain={[0, 24 * 60]}
              ticks={timeAxisTicks}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {/* Add area between sunrise and sunset */}
            <Area
              type="monotone"
              dataKey="avgSunset"
              data={monthlyData}
              stroke="none"
              fill="#73EC8B"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="avgSunrise"
              data={monthlyData}
              stroke="none"
              fill="#8884d8"
              fillOpacity={0.1}
            />
            {/* Add reference line for current month */}
            {monthlyData.map(
              (entry, index) =>
                entry.isCurrentMonth && (
                  <ReferenceLine
                    key={`ref-${index}`}
                    x={entry.month}
                    stroke="#2dd4bf"
                    strokeWidth={2.5}
                    //   strokeOpacity={1}
                    isFront={true}
                  />
                )
            )}

            <Line
              type="monotone"
              dataKey="avgSunrise"
              stroke="#FFB200"
              name="Sunrise"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="avgSunset"
              stroke="#EB5B00"
              name="Sunset"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full h-96 bg-gradient-to-b from-slate-900 to-slate-800 px-5 pt-5 pb-12 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-300">
            Sunrise & Sunset time in
            <span className="bg-gradient-to-r from-[#3F5EFB] to-[#FC466B] bg-clip-text text-transparent">
              {" "}
              {getMonthName(date)}
            </span>
          </h2>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyData} onClick={handleDayClick}>
            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity={0.3}
              vertical={false}
            />
            <XAxis dataKey="day" />
            <YAxis
              tickFormatter={formatTime}
              domain={[0, 24 * 60]}
              ticks={timeAxisTicks}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {/* Add area between sunrise and sunset */}
            <Area
              type="monotone"
              dataKey="sunset"
              data={dailyData}
              stroke="none"
              fill="#82ca9d"
              fillOpacity={0.1}
            />
            <Area
              type="monotone"
              dataKey="sunrise"
              data={dailyData}
              stroke="none"
              fill="#8884d8"
              fillOpacity={0.1}
            />
            {/* Add reference line for current day */}
            {dailyData.map(
              (entry, index) =>
                entry.isCurrentDay && (
                  <ReferenceLine
                    key={`ref-${index}`}
                    x={entry.day}
                    stroke="#2dd4bf"
                    strokeWidth={2.5}
                    //   strokeOpacity={0.2}
                    isFront={true}
                  />
                )
            )}

            <Line
              type="monotone"
              dataKey="sunrise"
              stroke="#FFB200"
              name="Sunrise"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="sunset"
              stroke="#EB5B00"
              name="Sunset"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyChart;
