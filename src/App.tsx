import HotelDataProvider from "./contexts/HotelDataProvider";
import HotelList from "./pages/HotelList";

function App() {
  return (
    <HotelDataProvider>
      <HotelList />
    </HotelDataProvider>
  );
}

export default App;
