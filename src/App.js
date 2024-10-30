import CityHeader from './components/HomePage/CityHeader';

import SunSimulator from './components/HomePage/SunSimulator';
// import InputComponent from './components/inputComponents/InputComponent';
import SunCalcComponent from './components/data/SunCalc';


//Refactored
//Second
import TimeProgress from './refactor/Second/TimeProgress';
import LocationInput from './refactor/Second/LocationInput';
// Main
import MainCom from './refactor/Main/MianCom';
//input
import InputComponent from './components/inputComponents/InputComponent';

function App() {
  return (
    <div className="bg-teal-700">
      <CityHeader />
      <div className='mx-auto bg-teal-800 mb-2 max-w-7xl rounded-lg'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900'>
          <TimeProgress />
          <LocationInput />
        </div>
      </div>

      <div className='mx-auto bg-teal-800 mb-2 max-w-7xl rounded-lg'>
        <MainCom />
      </div>



      {/* <SunSimulator /> */}
      <InputComponent />

      <div className="p-4 mx-auto max-w-7xl ">
        {/* <SunCalcComponent /> */}
      </div>
    </div>
  );
}

export default App;