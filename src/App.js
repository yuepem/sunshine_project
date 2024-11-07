import CityHeader from './components/CityHeader';
import MainCom from './components/MainCom';
import TimeSlider from './components/TimeSlider';
import InputComponent from './components/InputComponent';
import MonthlyChart from './components/sunData/Chart';
import Footer from './components/Footer';


function App() {
  return (
    <div className="bg-gradient-to-r from-[#13547a] to-[#80d0c7] bg-teal-700">
      <CityHeader />
      <MainCom />
      <TimeSlider />
      <InputComponent />
      <MonthlyChart />  
      <Footer />  
    </div>
  );
}

export default App;