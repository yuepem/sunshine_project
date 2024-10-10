import ModelComponent from './refactor/components/3D_Model/ModelComponent';
import InputComponent from './refactor/components/inputComponents/InputComponent';
import Address from './refactor/components/MapServices/Address';
import SunCalcComponent from './refactor/components/SunCalc';

import useInputStore from './stores/inputStore';
import useRenderStore from './stores/renderStore';




function App() {
  const { latitude, longitude } = useInputStore();
  const { skyConfig } = useRenderStore();

  return (
    <div className="p-8 m-5 mx-auto max-w-7xl">
      <div className="h-[700px]">
        <h1 className='text-2xl font-bold text-green-900'>3D Model</h1>
        <ModelComponent {...skyConfig} />
      </div>
      <h1 className='text-2xl font-bold text-green-900'> Suncalc & Nominatim Input and Data</h1>
      {/* <InputComponent  /> */}
      {/* <div>
        {latitude && longitude ? (
          <p>Latitude: {latitude}, Longitude: {longitude}</p>
        ) : (
          <p>Getting location...</p>
        )}
      </div> */}
      {/* <Address  /> */}
      {/* <SunCalcComponent  /> */}
    </div>
  );
}

export default App;
