"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

export function ProductGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:w-20 shrink-0 pb-2 md:pb-0 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={clsx(
              "relative w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
              activeImage === index
                ? "border-indigo-600"
                : "border-transparent opacity-70 hover:opacity-100",
            )}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-square w-full bg-gray-50 rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeImage]}
              alt={`${productName} view ${activeImage + 1}`}
              fill
              className="object-cover object-center"
              priority
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
