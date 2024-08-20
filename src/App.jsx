import LineChart1 from "./sales";
import LineChart2 from "./salesGrowth";
import LineChart3 from "./customerAdded";
import LineChart4 from "./repeatCustomer";
import LineChart5 from "./customerValue";
import MapComponent from "./geographicalDistribution";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Data from API</h1>
      <div className="flex flex-col justify-between gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 flex-1 min-w-[300px]">
          <LineChart1 />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex-1 min-w-[300px]">
          <LineChart2 />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex-1 min-w-[300px]">
          <LineChart3 />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex-1 min-w-[300px]">
          <LineChart4 />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex-1 min-w-[300px]">
          <LineChart5 />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex-1 min-w-[300px]">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default App;
