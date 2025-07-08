const CategoryMenuSkeleton = () => {
  return (
    <div className="relative flex gap-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col flex-1 items-center min-w-fit px-4 py-2"
        >
          <div className="w-6 h-6 mb-2 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded w-12"></div>
        </div>
      ))}
      <div className="absolute bottom-0 -left-0 -right-0 h-0.5 bg-gray-100" />
    </div>
  );
};

export default CategoryMenuSkeleton;
