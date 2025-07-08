// Just for demo purposes
"use client";

import { HotelDetailProvider } from "@/contexts/HotelDetailProvider";

const HeroSection = () => {
  const { hotel, loading } = HotelDetailProvider.useHotelDetailContext();

  if (loading || !hotel) {
    return null;
  }

  return (
    <section className="mb-6 px-6">
      <div className="relative h-72 w-full overflow-hidden mt-2">
        <video
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
          poster={hotel.imageUrl}
          controls
        >
          <source
            src="https://videos.pexels.com/video-files/4713259/4713259-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default HeroSection;
