import { BrowserRouter, Route, Routes } from "react-router-dom";
import HotelList from "./pages/HotelList";

function App() {
  return (
    <main className="max-w-screen-sm mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/hotel/:id" element={<main>To Be Implemented</main>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
