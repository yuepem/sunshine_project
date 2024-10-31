
import CityHeader from './refactor/NavBar/CityHeader';
import TimeProgress from './refactor/Second/TimeProgress';
import LocationInput from './refactor/Second/LocationInput';
import MainCom from './refactor/Main/MianCom';
import InputComponent from './refactor//input/InputComponent';
import SunData from './refactor/data/SunData';


import SunCalcComponent from './components/SunCalc';
import TimeSlider from './components/inputComponents/TimeSlider';


function App() {
  return (
    <div className="bg-teal-700">
      <CityHeader />
      <MainCom />
      <TimeSlider />

      <div className='mx-auto bg-teal-800 mb-2 max-w-7xl rounded-lg'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900'>
          <TimeProgress />
          <LocationInput />
        </div>
      </div>
      <InputComponent />
      <SunData />
      <div className="p-4 mx-auto max-w-7xl ">
        <SunCalcComponent />
      </div>
    </div>
  );
}

export default App;