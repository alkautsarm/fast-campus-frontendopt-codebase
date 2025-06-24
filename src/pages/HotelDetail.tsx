import { useParams } from "react-router-dom";
import { HotelDetailProvider } from "@/contexts/HotelDetailProvider";
import Gallery from "@/components/Detail/Gallery";
import Description from "@/components/Detail/Description";

const Content = () => {
  const { hotel } = HotelDetailProvider.useHotelDetailContext();

  if (!hotel) return <div>Loading...</div>;

  return (
    <main>
      <Gallery />
      <Description />
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
