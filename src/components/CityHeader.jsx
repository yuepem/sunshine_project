import CityList from "./NavBar/CityList";

function CityHeader() {
  return (
    <div className="w-full bg-slate-900 opacity-80  backdrop-blur-sm sticky top-0 z-10">
      <div className="px-4 mx-auto max-w-7xl my-6 p-2">
        <CityList />
      </div>
    </div>
  );
}

export default CityHeader;
