import HotelDataProvider from "./contexts/HotelDataProvider";
import HotelList from "./pages/HotelList";

function App() {
  return (
    <main className="max-w-screen-sm mx-auto">
      <HotelDataProvider>
        <HotelList />
      </HotelDataProvider>
    </main>
  );
}

export default App;
