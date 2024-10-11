import MapSection from "./components/MapSection";
import SunData from "./components/SunData";


const SunCalcComponent = () => {
  return (
    <div className="mx-auto max-w-7xl bg-stone-100">
      <SunData />
      <MapSection />
    </div>
  );
};

export default SunCalcComponent;
