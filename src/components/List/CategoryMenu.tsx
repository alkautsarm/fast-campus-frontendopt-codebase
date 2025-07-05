import HotelListProvider from "@/contexts/HotelListProvider";
import { useDebounce } from "@/hooks/useDebounce";
import { CategoryOptions } from "@/constants";

const CategoryMenu = () => {
  const { selectedCategory, handleCategorySelect } =
    HotelListProvider.useHotelListContext();

  const debouncedCategorySelect = useDebounce(handleCategorySelect, 300);

  return (
    <div className="relative flex gap-6">
      {CategoryOptions.map((category) => (
        <button
          key={category.id}
          onClick={() =>
            debouncedCategorySelect(
              selectedCategory === category.id ? null : category.id,
            )
          }
          className={`flex flex-col flex-1 items-center min-w-fit px-4 py-2 relative ${
            selectedCategory === category.id ? "text-gray-900" : "text-gray-500"
          }`}
        >
          <img
            src={category.icon.src}
            alt={category.label}
            className={`w-6 h-6 mb-2 ${
              selectedCategory === category.id ? "opacity-100" : "opacity-70"
            }`}
          />
          <span className="text-xs font-medium whitespace-nowrap">
            {category.label}
          </span>
          {selectedCategory === category.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black z-1" />
          )}
        </button>
      ))}
      <div className="absolute bottom-0 -left-0 -right-0 h-0.5 bg-gray-100" />
    </div>
  );
};

export default CategoryMenu;
