import CityHeader from './components/CityHeader';
import MainCom from './components/MainCom';
import TimeProgress from './components/TimeProgress/TimeProgress';
import LocationInput from './components/TimeProgress/LocationInput';
import InputComponent from './components/InputComponent';
import SunData from './components/sunData/SunData';
// import TimeSlider from './components/TimeSlider';

import TimeSlider2 from './components/TimeSlider2';


function App() {
  return (
    <div className="bg-gradient-to-r from-[#13547a] to-[#80d0c7] bg-teal-700">
      <CityHeader />
      <MainCom />
      {/* <TimeSlider /> */}
      <TimeSlider2 />
      <div className='mx-auto bg-teal-800 mb-2 max-w-7xl rounded-lg'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900'>
          <TimeProgress />
          <LocationInput />
        </div>
      </div>
      <InputComponent />
      <SunData />
    </div>
  );
}

export default App;