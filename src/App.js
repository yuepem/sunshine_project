import CityHeader from './components/HomePage/CityHeader';
import SunSimulator from './components/HomePage/SunSimulator';
import InputComponent from './components/inputComponents/InputComponent';
import SunCalcComponent from './components/data/SunCalc';

function App() {
  return (
    <div className="bg-teal-800">
      <CityHeader />
      <SunSimulator />
      <InputComponent />
      <div className="p-4 mx-auto max-w-7xl ">
        <SunCalcComponent />
      </div>
    </div>
  );
}

export default App;