import arcticIcon from "~/assets/icons/arctic.svg";
import cabinIcon from "~/assets/icons/cabin.svg";
import cavesIcon from "~/assets/icons/caves.svg";
import islandIcon from "~/assets/icons/island.svg";
import { EHotelCategory } from "@/types";

interface CategoryMenuProps {
  selectedCategory: EHotelCategory | null;
  onCategorySelect: (category: EHotelCategory | null) => void;
}

const Categories = [
  { id: EHotelCategory.Island, icon: islandIcon, label: "Island" },
  { id: EHotelCategory.Cabin, icon: cabinIcon, label: "Cabin" },
  { id: EHotelCategory.Caves, icon: cavesIcon, label: "Caves" },
  { id: EHotelCategory.Arctic, icon: arcticIcon, label: "Arctic" },
];

const CategoryMenu = ({
  selectedCategory,
  onCategorySelect,
}: CategoryMenuProps) => {
  return (
    <div className="relative flex gap-6">
      {Categories.map((category) => (
        <button
          key={category.id}
          onClick={() =>
            onCategorySelect(
              selectedCategory === category.id ? null : category.id,
            )
          }
          className={`flex flex-col flex-1 items-center min-w-fit px-4 py-2 relative ${
            selectedCategory === category.id ? "text-gray-900" : "text-gray-500"
          }`}
        >
          <img
            src={category.icon}
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
