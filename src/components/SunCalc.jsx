import MapSection from "./data/MapSection";
import SunData from "./data/SunData";

const SunCalcComponent = () => {
  return (
    <div className="mx-auto max-w-7xl bg-stone-100">
      <SunData />
      <MapSection />
    </div>
  );
};

export default SunCalcComponent;
