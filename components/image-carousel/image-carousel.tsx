"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Indicator from "./indicator";

export default function ImageCarousel() {
  const images = [
    "/hero-images/image1.jpg",
    "/hero-images/image2.jpg",
    "/hero-images/image3.jpg",
  ];
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);

  const next = useCallback(() => {
    setAuto(false);
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setAuto(false);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-advance every 5 seconds. stop when user clicks on indicator or arrows
  useEffect(() => {
    if (!auto) return;
    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, [auto, next]);

  return (
    <section className="border-t bg-white py-16">
      <div className="container relative mx-auto px-4">
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-lg">
          {/* Carousel Image */}
          <div
            className={`flex transition-transform duration-500 `}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`Hero Image ${i + 1}`}
                className="w-full shrink-0 object-cover"
                width={800}
                height={450}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute h-full left-0 top-1/2 transition-opacity transform -translate-y-1/2 px-4 cursor-pointer text-gray-300 hover:text-gray-100 rounded-r-[200%_100%] bg-radial-[at_0%_50%] opacity-0 hover:opacity-100 from-white/20 to-transparent to-70%"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={next}
            className="absolute h-full right-0 top-1/2 transition-opacity transform -translate-y-1/2 px-4 cursor-pointer text-gray-300 hover:text-gray-100 rounded-l-[200%_100%] bg-radial-[at_100%_50%] opacity-0 hover:opacity-100 from-white/20 to-transparent to-70%"
          >
            <ChevronRight className="w-8 h-8" size={100} />
          </button>

          {/* Indicator */}
          <Indicator
            num={images.length}
            index={index}
            indexCallback={(newIndex) => {
              setAuto(false);
              setIndex(newIndex);
            }}
          />
        </div>
      </div>
    </section>
  );
}
