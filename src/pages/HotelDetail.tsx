import { useParams } from "react-router-dom";
import Gallery from "@/components/Detail/Gallery";
import { HotelDetailProvider } from "@/contexts/HotelDetailProvider";

const Content = () => {
  const { hotel } = HotelDetailProvider.useHotelDetailContext();

  if (!hotel) return <div>Loading...</div>;

  return (
    <main>
      <Gallery />
    </main>
  );
};

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <HotelDetailProvider id={id || ""}>
      <Content />
    </HotelDetailProvider>
  );
};

export default HotelDetail;
