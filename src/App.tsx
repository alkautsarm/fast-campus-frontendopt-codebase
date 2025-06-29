import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load the components
const HotelList = lazy(() => import("./pages/HotelList"));
const HotelDetail = lazy(() => import("./pages/HotelDetail"));

function App() {
  return (
    <main className="max-w-screen-sm mx-auto">
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HotelList />} />
            <Route path="/hotel/:id/*" element={<HotelDetail />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </main>
  );
}

export default App;
