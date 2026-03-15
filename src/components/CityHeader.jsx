import CityList from "./NavBar/CityList";

function CityHeader() {
  return (
    <div className="sticky top-0 z-50 w-full bg-slate-900 opacity-80 backdrop-blur-sm">
      <div className="px-4 mx-auto max-w-6xl mb-3 p-2">
        <CityList />
      </div>
    </div>
  );
}

export default CityHeader;
