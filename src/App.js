
import InfoComponent from './components/Info-suncalc';
import GeocodeComponent from './components/MapServices/Nominatim';

function App() {
  return (
    <div className="m-8">
      <h1 className='text-3xl font-semibold text-green-900'> Suncalc and Nominatim</h1>
      <GeocodeComponent  />
      <InfoComponent />
    </div>
  );
}

export default App;
