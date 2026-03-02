"use client";

import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, getDiscountedProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "motion/react";
import { ArrowRight, Truck, ShieldCheck, CreditCard, Clock, Percent, ThumbsUp, Star } from "lucide-react";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const discountedProducts = getDiscountedProducts();

  const categories = [
    { name: "Кровати", image: "https://picsum.photos/seed/cat_beds/400/400", href: "/catalog?category=beds", color: "bg-blue-50" },
    { name: "Диваны", image: "https://picsum.photos/seed/cat_sofas/400/400", href: "/catalog?category=sofas", color: "bg-amber-50" },
    { name: "Матрасы", image: "https://picsum.photos/seed/cat_mattresses/400/400", href: "/catalog?category=mattresses", color: "bg-emerald-50" },
    { name: "Аксессуары", image: "https://picsum.photos/seed/cat_acc/400/400", href: "/catalog?category=accessories", color: "bg-purple-50" },
    { name: "Новинки", image: "https://picsum.photos/seed/cat_new/400/400", href: "/catalog", color: "bg-rose-50" },
    { name: "Распродажа", image: "https://picsum.photos/seed/cat_sale/400/400", href: "/catalog?discount=true", color: "bg-red-50" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-32 md:pt-40">
      {/* Hero Banner Slider (Simplified) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
        <div className="relative h-[200px] sm:h-[300px] md:h-[400px] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm">
          <Image
            src="https://picsum.photos/seed/marketplace_banner/1920/800"
            alt="Летняя распродажа"
            fill
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-900/50 to-transparent flex flex-col justify-center px-6 md:px-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <span className="inline-block py-1 px-2 md:px-3 rounded-lg bg-red-500 text-white text-xs md:text-sm font-bold tracking-wider mb-2 md:mb-4 uppercase">
                Скидки до 40%
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-2 md:mb-4 leading-tight tracking-tight">
                Большая летняя распродажа
              </h1>
              <p className="text-sm md:text-lg text-indigo-100 mb-4 md:mb-8 hidden sm:block">
                Обновите интерьер с максимальной выгодой. Только до конца месяца.
              </p>
              <Link
                href="/catalog?discount=true"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-50 transition-colors text-sm md:text-base"
              >
                Смотреть предложения
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Categories (Marketplace Style) */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {categories.map((category, idx) => (
              <Link key={idx} href={category.href} className="flex flex-col items-center gap-2 shrink-0 group">
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${category.color} p-2 overflow-hidden relative transition-transform group-hover:scale-105`}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors text-center w-20 md:w-24 leading-tight">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Deals */}
      <section className="py-8 bg-white rounded-t-3xl border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                <Percent className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                Горячие скидки
              </h2>
            </div>
            <Link href="/catalog?discount=true" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              Все акции <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {discountedProducts.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                <Star className="w-6 h-6 fill-amber-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                Хиты продаж
              </h2>
            </div>
            <Link href="/catalog" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              Весь каталог <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {featuredProducts.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Banners */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-2xl p-6 md:p-8 flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10 max-w-[60%]">
                <h3 className="text-xl md:text-2xl font-black text-indigo-900 mb-2">Бесплатная доставка</h3>
                <p className="text-sm text-indigo-700 mb-4">При заказе от 50 000 ₽ по Москве и области</p>
                <Link href="/delivery" className="inline-block px-5 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors">
                  Подробнее
                </Link>
              </div>
              <Truck className="absolute right-[-10%] bottom-[-20%] w-48 h-48 text-indigo-100 opacity-50" />
            </div>
            <div className="bg-emerald-50 rounded-2xl p-6 md:p-8 flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10 max-w-[60%]">
                <h3 className="text-xl md:text-2xl font-black text-emerald-900 mb-2">Рассрочка 0%</h3>
                <p className="text-sm text-emerald-700 mb-4">Покупайте сейчас, платите потом. До 12 месяцев.</p>
                <Link href="/delivery" className="inline-block px-5 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-colors">
                  Оформить
                </Link>
              </div>
              <CreditCard className="absolute right-[-10%] bottom-[-20%] w-48 h-48 text-emerald-100 opacity-50" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
