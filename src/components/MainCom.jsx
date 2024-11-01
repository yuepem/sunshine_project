import { useEffect } from "react";
import ModelComponent from "./Simulator/ModelComponent";
import LocationInfo from "./Simulator/LocationInfo";
import SimulatorDateTime from "./Simulator/SimulatorDateTime";

import useInputStore from "../stores/inputStore";
import useSunCalcStore from "../stores/sunSalcStore";

const MainCom = () => {
  const { date, latitude, longitude, getAddress } = useInputStore();
  const { calculateSunData } = useSunCalcStore();

  useEffect(() => {
    calculateSunData({ date, latitude, longitude });
  }, [date, latitude, longitude]);

  useEffect(() => {
    getAddress();
  }, [latitude, longitude]);

  return (
    <div className="mx-auto bg-teal-800 mb-2 max-w-7xl rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 md:  gap-4 p-4 rounded-xl bg-slate-900">
        <div className="col-span-2">
          <ModelComponent />
        </div>
        <div className="grid grid-cols-1 gap-4 rounded-xl bg-slate-900">
          <LocationInfo />
          <SimulatorDateTime />
        </div>
      </div>
    </div>
  );
};

export default MainCom;
