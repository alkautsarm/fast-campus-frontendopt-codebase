"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { HotelDetailProvider } from "@/contexts/HotelDetailProvider";
import Link from "next/link";
import Image from "next/image";

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
      <div className="relative w-full h-80">
        <Image
          src={hotel.imageUrl}
          alt={hotel.name}
          fill
          className="object-cover cursor-pointer"
          onClick={handleOpenPhotosModal}
          sizes="100vw"
          priority
        />
      </div>

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
                <div key={index} className="relative w-full h-64">
                  <Image
                    src={photo}
                    alt={`${hotel.name} photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1">
              <div className="relative w-full h-64">
                <Image
                  src={hotel.photos[2]}
                  alt={`${hotel.name} photo 3`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {hotel.photos.slice(3).map((photo, index) => (
                <div key={index} className="relative w-full h-64">
                  <Image
                    src={photo}
                    alt={`${hotel.name} photo ${index + 4}`}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
