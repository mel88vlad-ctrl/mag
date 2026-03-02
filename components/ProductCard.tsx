"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";
import { useCart } from "./CartProvider";
import { motion } from "motion/react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const cartItem = items.find((item) => item.product.id === product.id);
  const inCart = !!cartItem;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col bg-white rounded-2xl p-3 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 rounded-xl mb-3">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {product.oldPrice && (
            <div className="bg-red-500 text-white px-1.5 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider">
              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </div>
          )}
          {product.isNew && (
            <div className="bg-emerald-500 text-white px-1.5 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider">
              Новинка
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm"
        >
          <Heart className={clsx("w-4 h-4", isFavorite && "fill-red-500 text-red-500")} />
        </button>

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
            <div className="bg-white px-3 py-1.5 text-xs font-bold text-gray-900 rounded-lg shadow-sm">
              Нет в наличии
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1">
        {/* Price Block */}
        <div className="mb-1.5 flex items-baseline gap-2 flex-wrap">
          <p className="text-xl font-black text-gray-900 tracking-tight">
            {product.price.toLocaleString("ru-RU")} ₽
          </p>
          {product.oldPrice && (
            <p className="text-xs text-gray-400 line-through font-medium">
              {product.oldPrice.toLocaleString("ru-RU")} ₽
            </p>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm text-gray-700 line-clamp-2 mb-2 flex-1 leading-snug">
          <Link href={`/product/${product.id}`} className="hover:text-indigo-600 transition-colors">
            {product.name}
          </Link>
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-gray-900">{product.rating}</span>
          <span className="text-xs text-gray-400 ml-1">{product.reviewsCount} отзывов</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => {
          if (!inCart) addItem(product);
        }}
        disabled={!product.inStock}
        className={clsx(
          "w-full py-2.5 px-4 text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2",
          !product.inStock 
            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
            : inCart
              ? "bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200"
        )}
      >
        {inCart ? (
          "В корзине"
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            В корзину
          </>
        )}
      </button>
    </motion.div>
  );
}
