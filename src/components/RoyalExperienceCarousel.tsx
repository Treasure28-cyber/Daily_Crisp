"use client";

import Image from "next/image";
import { useState, useRef } from "react";

const images = [
  {
    src: "/food-image1.jpeg",
    alt: "Royal Calabar platter feature image",
  },
  {
    src: "/food-image2-bg.png",
    alt: "Royal platter side dish",
  },
  {
    src: "/food-image3.png",
    alt: "Royal platter crispy chicken close-up",
  },
];

export function RoyalExperienceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Mobile Carousel */}
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-[var(--light-grey)] md:hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative aspect-square w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 90vw, 0vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#C0151F] w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden grid-cols-2 gap-3 md:grid">
        {/* Large image - spans 2 rows */}
        <div className="relative col-span-1 row-span-2 aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--light-grey)]">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes="(min-width: 768px) 100vw, 45vw"
            className="object-cover"
          />
        </div>

        {/* Two smaller images */}
        <div className="relative col-span-1 aspect-square overflow-hidden rounded-2xl bg-[var(--off-white)]">
          <Image
            src={images[1].src}
            alt={images[1].alt}
            fill
            sizes="(min-width: 768px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
        <div className="relative col-span-1 aspect-square overflow-hidden rounded-2xl bg-[var(--light-grey)]">
          <Image
            src={images[2].src}
            alt={images[2].alt}
            fill
            sizes="(min-width: 768px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
}
