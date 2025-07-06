"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { HotelDetailProvider } from "@/contexts/HotelDetailProvider";
import Link from "next/link";

const Gallery = () => {
  const { hotel } = HotelDetailProvider.useHotelDetailContext();
  const [showPhotosModal, setShowPhotosModal] = useState(false);

  const handleOpenPhotosModal = () => {
    setShowPhotosModal(true);
  };

  const handleClosePhotosModal = () => {
    setShowPhotosModal(false);
  };

  if (!hotel) return null;

  return (
    <section className="relative">
      <picture>
        <source srcSet={hotel.imageUrlWebp} type="image/webp" />
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-80 object-cover cursor-pointer"
          onClick={handleOpenPhotosModal}
        />
      </picture>

      <Link
        href="/"
        className="absolute top-4 left-4 p-2 bg-white/80 hover:bg-white/90 rounded-full shadow-lg transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </Link>

      <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
        {hotel.photos.length} photos
      </div>

      {showPhotosModal && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 bg-white">
            <button
              onClick={handleClosePhotosModal}
              className="p-2 text-black hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="grid gap-2 h-full">
            <div className="grid grid-cols-2 gap-2">
              {hotel.photos.slice(0, 2).map((photo, index) => (
                <picture key={index}>
                  <source srcSet={hotel.photos[index]} type="image/webp" />
                  <img
                    src={photo}
                    alt={`${hotel.name} photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </picture>
              ))}
            </div>
            <div className="grid grid-cols-1">
              <picture>
                <source srcSet={hotel.photosWebp[2]} type="image/webp" />
                <img
                  src={hotel.photos[2]}
                  alt={`${hotel.name} photo 3`}
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {hotel.photos.slice(3).map((photo, index) => (
                <picture key={index}>
                  <source
                    srcSet={hotel.photosWebp[index + 3]}
                    type="image/webp"
                  />
                  <img
                    src={photo}
                    alt={`${hotel.name} photo ${index + 4}`}
                    className="w-full h-full object-cover"
                  />
                </picture>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
