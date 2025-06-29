const LocationSkeleton = () => {
  return (
    <section className="mb-6 px-6 animate-pulse">
      <div className="pb-6 h-[400px] border-b border-gray-200">
        <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
          <div className="text-gray-500 text-lg font-medium">
            Loading Map...
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSkeleton;
