import SearchBarSkeleton from "./SearchBarSkeleton";
import CategoryMenuSkeleton from "./CategoryMenuSkeleton";
import HotelCardSkeleton from "./HotelCardSkeleton";

const HotelListSkeleton = () => {
  return (
    <main className="pt-4 border-l border-r border-gray-100">
      <h1 className="text-2xl font-bold mb-4 px-4">Explore</h1>
      <SearchBarSkeleton />
      <CategoryMenuSkeleton />

      <section className="flex flex-col gap-6 px-4 mt-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} style={{ marginBottom: "24px" }}>
            <HotelCardSkeleton />
          </div>
        ))}
      </section>
    </main>
  );
};

export default HotelListSkeleton;
