import CityHeader from './components/CityHeader';
import MainCom from './components/MainCom';
import InputComponent from './components/InputComponent';
import MonthlyChart from './components/sunData/Chart';
import Footer from './components/Footer';
import TestSliderB from './components/TimeSlider-B';


function App() {
  return (
    <div className="bg-gradient-to-r from-[#13547a] to-[#80d0c7] bg-teal-700">
      <CityHeader />
      <MainCom />
      <TestSliderB />
      <InputComponent />
      <MonthlyChart />  
      <Footer />  
    </div>
  );
}

export default App;