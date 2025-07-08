import { ChevronLeft } from "lucide-react";

const GallerySkeleton = () => {
  return (
    <section className="relative animate-pulse">
      <div className="w-full h-80 bg-gray-300"></div>

      <button className="absolute top-4 left-4 p-2 bg-white/80 hover:bg-white/90 rounded-full shadow-lg transition-colors">
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
        <div className="h-4 bg-gray-400 rounded w-16"></div>
      </div>
    </section>
  );
};

export default GallerySkeleton;
