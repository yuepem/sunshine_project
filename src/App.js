import CityHeader from './components/CityHeader';
import MainCom from './components/MainCom';
import TimeProgress from './components/TimeProgress/TimeProgress';
import LocationInput from './components/TimeProgress/LocationInput';
import InputComponent from './components/InputComponent';
import SunData from './components/sunData/SunData';
import TimeSlider from './components/TimeSlider';


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
    </div>
  );
}

export default App;