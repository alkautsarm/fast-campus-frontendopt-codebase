import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import {
  HotelDetailSkeleton,
  HotelListSkeleton,
  ReviewsPageSkeleton,
} from "./components/skeletons";

// Lazy load the components
const HotelList = lazy(() => import("./pages/HotelList"));
const HotelDetail = lazy(() => import("./pages/HotelDetail"));

const SuspenseFallback = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return <HotelListSkeleton />;
  }

  if (location.pathname.match(/^\/hotel\/[^/]+$/)) {
    return <HotelDetailSkeleton />;
  }

  if (location.pathname.match(/^\/hotel\/[^/]+\/reviews$/)) {
    return <ReviewsPageSkeleton />;
  }

  return (
    <section className="flex justify-center items-center min-h-screen">
      Loading...
    </section>
  );
};

function App() {
  return (
    <main className="max-w-screen-sm mx-auto">
      <BrowserRouter>
        <Suspense fallback={<SuspenseFallback />}>
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
