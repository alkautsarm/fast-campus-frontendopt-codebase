import { Minus, Plus } from "lucide-react";
import { TenantOptions } from "@/constants";
import HotelListProvider from "@/contexts/HotelListProvider";
import { TenantCounts } from "@/types";

interface TenantSectionProps {
  title: string;
  description: string;
  count: number;
  onChange: (count: number) => void;
}

const TenantSection = ({
  title,
  description,
  count,
  onChange,
}: TenantSectionProps) => (
  <div className="flex items-center justify-between">
    <div>
      <div>{title}</div>
      <div className="text-xs font-light text-gray-400">{description}</div>
    </div>
    <div className="flex items-center">
      <button
        onClick={() => onChange(count - 1)}
        disabled={count === 0}
        className="p-2 rounded-full border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="text-center w-6 mx-2">{count}</span>
      <button
        onClick={() => onChange(count + 1)}
        className="p-2 rounded-full border border-gray-200 hover:bg-gray-100"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const TenantSearchCard = () => {
  const { setTenantCounts, tenantCounts } =
    HotelListProvider.useHotelListContext();

  const updateCount = (type: keyof TenantCounts, count: number) => {
    const newCounts = { ...tenantCounts, [type]: count };

    setTenantCounts(newCounts);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-10">Who's coming?</h2>

      <div className="space-y-8">
        {TenantOptions.map((option) => (
          <TenantSection
            key={option.id}
            title={option.title}
            description={option.description}
            count={tenantCounts[option.id as keyof TenantCounts]}
            onChange={(count) =>
              updateCount(option.id as keyof TenantCounts, count)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default TenantSearchCard;
