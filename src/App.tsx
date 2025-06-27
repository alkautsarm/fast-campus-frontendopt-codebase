import { BrowserRouter, Route, Routes } from "react-router-dom";
import HotelList from "./pages/HotelList";
import HotelDetail from "./pages/HotelDetail";

function App() {
  return (
    <main className="max-w-screen-sm mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/hotel/:id/*" element={<HotelDetail />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
