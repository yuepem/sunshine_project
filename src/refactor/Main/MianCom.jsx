import ModelComponent from "./ModelComponent";
import SimulatorLocation from "./SimulatorLocation";
import SimulatorSun from "./SimulatorSun";

import useInputStore from "../../stores/inputStore";
import useSunCalcStore from "../../stores/sunSalcStore";
import { useEffect } from "react";

// import { useSunCalculations } from "../../stores/hooks/useSunCalculations";
// import { useSunCoordinates } from "../../stores/hooks/useSunCoordinates";

const MainCom = () => {
  // useSunCalculations();
  // useSunCoordinates();
  const { date, latitude, longitude } = useInputStore();
  const { calculateSunData } = useSunCalcStore();

  useEffect(() => {
    calculateSunData({ date, latitude, longitude });
  }, [date, latitude, longitude]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:  gap-4 p-4 rounded-xl bg-slate-900">
      <div className="col-span-2">
        <ModelComponent />
      </div>
      <div className="grid grid-cols-1 gap-4 rounded-xl bg-slate-900">
        <SimulatorLocation />
        <SimulatorSun />
      </div>
    </div>
  );
};

export default MainCom;
