"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search, Heart, User, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "./CartProvider";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Кровати", href: "/catalog?category=beds" },
    { name: "Диваны", href: "/catalog?category=sofas" },
    { name: "Матрасы", href: "/catalog?category=mattresses" },
    { name: "Аксессуары", href: "/catalog?category=accessories" },
  ];

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-200"
          : "bg-white border-gray-100",
      )}
    >
      {/* Top Bar (City, Contacts) */}
      <div className="hidden md:block bg-gray-50 border-b border-gray-100 py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <MapPin className="w-3.5 h-3.5" />
              <span>Москва</span>
            </button>
            <span className="w-px h-3 bg-gray-300" />
            <Link href="/delivery" className="hover:text-gray-900 transition-colors">Доставка и оплата</Link>
            <Link href="/about" className="hover:text-gray-900 transition-colors">О компании</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+78000000000" className="font-medium text-gray-900 hover:text-indigo-600 transition-colors">
              8 (800) 000-00-00
            </a>
            <span className="text-gray-400">Ежедневно с 9:00 до 21:00</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4 md:gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-black tracking-tighter text-indigo-600 shrink-0 uppercase"
          >
            Сон&Уют
          </Link>

          {/* Catalog Button (Desktop) */}
          <Link
            href="/catalog"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shrink-0"
          >
            <Menu className="w-5 h-5" />
            Каталог
          </Link>

          {/* Search Bar (Desktop & Mobile) */}
          <div className="flex-1 max-w-3xl relative hidden md:block">
            <input
              type="text"
              placeholder="Искать товары..."
              className="w-full pl-4 pr-12 py-3 bg-gray-100 border-2 border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-600 focus:ring-0 transition-colors outline-none"
              suppressHydrationWarning
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 md:space-x-2 shrink-0">
            <button className="hidden md:flex flex-col items-center justify-center w-16 h-14 text-gray-500 hover:text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors">
              <User className="w-6 h-6 mb-1" strokeWidth={1.5} />
              <span className="text-[10px] font-medium leading-none">Войти</span>
            </button>
            <button className="hidden md:flex flex-col items-center justify-center w-16 h-14 text-gray-500 hover:text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors">
              <Heart className="w-6 h-6 mb-1" strokeWidth={1.5} />
              <span className="text-[10px] font-medium leading-none">Избранное</span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className={clsx(
                "relative flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-colors",
                totalItems > 0 
                  ? "text-indigo-600 bg-indigo-50 hover:bg-indigo-100" 
                  : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
              )}
              aria-label="Корзина"
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6 mb-1" strokeWidth={totalItems > 0 ? 2 : 1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 text-[11px] font-black leading-none text-white bg-red-500 rounded-full border-2 border-white shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className={clsx(
                "text-[10px] leading-none hidden md:block",
                totalItems > 0 ? "font-bold" : "font-medium"
              )}>Корзина</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search (Visible only on mobile) */}
        <div className="mt-3 md:hidden relative">
          <input
            type="text"
            placeholder="Искать товары..."
            className="w-full pl-4 pr-10 py-2.5 bg-gray-100 border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-600 focus:ring-0 outline-none"
            suppressHydrationWarning
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Categories Nav (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6 mt-3 pb-1 overflow-x-auto scrollbar-hide">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/catalog?discount=true" className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors whitespace-nowrap">
            Акции %
          </Link>
        </nav>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden overflow-hidden border-t border-gray-100"
          >
            <div className="px-4 py-4">
              <div className="space-y-1">
                <Link
                  href="/catalog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-xl text-base font-bold text-white bg-indigo-600 mb-4 text-center"
                >
                  Перейти в каталог
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/catalog?discount=true"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-bold text-red-500 hover:bg-red-50 mt-2"
                >
                  Акции %
                </Link>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl text-gray-600">
                  <User className="w-6 h-6 mb-2" />
                  <span className="text-xs font-medium">Профиль</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl text-gray-600">
                  <Heart className="w-6 h-6 mb-2" />
                  <span className="text-xs font-medium">Избранное</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
