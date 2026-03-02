"use client";

import { useState } from "react";
import { Product } from "@/lib/data";
import { useCart } from "./CartProvider";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

export function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product, quantity);
  };

  if (!product.inStock) {
    return (
      <div className="w-full py-4 px-6 bg-gray-100 text-gray-500 text-center font-medium rounded-xl border border-gray-200 cursor-not-allowed">
        Нет в наличии
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3 sm:w-32">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Уменьшить количество"
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="font-medium text-gray-900">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Увеличить количество"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleAdd}
        className="flex-1 flex items-center justify-center gap-2 py-4 px-8 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
      >
        <ShoppingBag className="w-5 h-5" />
        Добавить в корзину
      </motion.button>
    </div>
  );
}
