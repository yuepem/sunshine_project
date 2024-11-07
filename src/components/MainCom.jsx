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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, latitude, longitude]);

  useEffect(() => {
    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  return (
    <div className="mx-auto bg-slate-800/30 mb-2 max-w-7xl rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 md:  gap-4 p-4 rounded-xl ">
        <div className="col-span-2">
          <ModelComponent />
        </div>
        <div className="flex flex-col gap-4 rounded-xl ">
          <LocationInfo />
          <SimulatorDateTime />
        </div>
      </div>
    </div>
  );
};

export default MainCom;
