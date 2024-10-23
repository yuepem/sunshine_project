import ModelComponent from './components/3D_Model/ModelComponent';
import InputComponent from './components/inputComponents/InputComponent';
import Address from './components/MapServices/Address';
import SunCalcComponent from './components/data/SunCalc';


function App() {
  return (
    <div className="bg-teal-800">
      <div className="w-full bg-slate-900 opacity-80  backdrop-blur-sm sticky top-0 z-10">

        <InputComponent />
      </div>

        <ModelComponent />

      <div className="p-4 mx-auto max-w-7xl ">

        <h1 className='text-xl font-bold text-green-900 mt-12'> Input Area</h1>
        <Address />
        <SunCalcComponent />
      </div>
    </div>
  );
}

export default App;