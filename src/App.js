import ModelComponent from './components/3D_Model/ModelComponent';
import InputComponent from './components/inputComponents/InputComponent';
import Address from './components/MapServices/Address';
import SunCalcComponent from './components/data/SunCalc';


function App() {
  return (
    <div className="p-8 m-5 mx-auto max-w-7xl">
      <div className="h-[700px]">
        <h1 className='text-2xl font-bold text-green-900'>3D Model</h1>
        <ModelComponent />
      </div>
      <h1 className='text-xl font-bold text-green-900 mt-12'> Input Area</h1>
      <InputComponent />
      <Address />
      <SunCalcComponent />
    </div>
  );
}

export default App;