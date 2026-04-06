"use client";

import { useEffect } from "react";
import CityHeader from "@/src/components/CityHeader";
import MainCom from "@/src/components/MainCom";
import TimeSliderB from "@/src/components/TimeSlider-B";
import InputComponent from "@/src/components/InputComponent";
import Chart from "@/src/components/sunData/Chart";
import useInputStore from "@/src/stores/inputStore";

const experienceModes = {
  homepage: {
    header: false,
    main: true,
    slider: true,
    inputs: true,
    chart: true,
  },
  city: {
    header: true,
    main: true,
    slider: true,
    inputs: true,
    chart: true,
  },
  "sun-position-calculator": {
    header: true,
    main: true,
    slider: true,
    inputs: false,
    chart: false,
  },
  "daylight-hours-calculator": {
    header: true,
    main: false,
    slider: false,
    inputs: true,
    chart: true,
  },
  "solar-noon-calculator": {
    header: true,
    main: true,
    slider: true,
    inputs: true,
    chart: false,
  },
};

export default function InteractiveSunExperience({
  mode = "homepage",
  city,
}) {
  const contentWidthClass = "mx-auto w-full max-w-6xl px-4";
  const setLatitude = useInputStore((state) => state.setLatitude);
  const setLongitude = useInputStore((state) => state.setLongitude);
  const setCity = useInputStore((state) => state.setCity);
  const setAddress = useInputStore((state) => state.setAddress);
  const setTimeZone = useInputStore((state) => state.setTimeZone);
  const setDate = useInputStore((state) => state.setDate);

  useEffect(() => {
    if (!city) {
      return;
    }

    setLatitude(city.latitude);
    setLongitude(city.longitude);
    setCity(city.name);
    setAddress(`${city.name}, ${city.country}`);
    setTimeZone(city.timeZone);
    setDate(new Date());
  }, [
    city,
    setAddress,
    setCity,
    setDate,
    setLatitude,
    setLongitude,
    setTimeZone,
  ]);

  const selectedMode = experienceModes[mode] || experienceModes.homepage;

  return (
    <div className="flex flex-col gap-2">
      {selectedMode.header ? <CityHeader /> : null}
      {selectedMode.main ? (
        <div className={contentWidthClass}>
          <MainCom />
        </div>
      ) : null}
      {selectedMode.slider ? (
        <div className={contentWidthClass}>
          <TimeSliderB />
        </div>
      ) : null}
      {selectedMode.inputs ? (
        <div className={contentWidthClass}>
          <InputComponent />
        </div>
      ) : null}
      {selectedMode.chart ? (
        <div className={contentWidthClass}>
          <Chart />
        </div>
      ) : null}
    </div>
  );
}
