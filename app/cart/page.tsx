"use client";

import { useCart } from "@/components/CartProvider";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { motion } from "motion/react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Trash2 className="w-10 h-10 text-gray-300" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
          В корзине пока пусто
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Загляните на главную, чтобы выбрать товары или найдите нужное в поиске
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
        >
          Перейти к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">
          Корзина <span className="text-gray-400 text-2xl font-medium ml-2">{items.length}</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                  <span className="text-sm font-bold text-gray-900">Выбрать все</span>
                </label>
                <button className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors">
                  Удалить выбранные
                </button>
              </div>
              <ul className="divide-y divide-gray-100">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <input type="checkbox" defaultChecked className="mt-2 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4">
                        <div className="max-w-md">
                          <h3 className="text-base font-bold text-gray-900 leading-snug mb-1">
                            <Link href={`/product/${item.product.id}`} className="hover:text-indigo-600 transition-colors">
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {item.product.category === "beds" ? "Кровать" : "Диван"}
                          </p>
                          <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">
                            <Truck className="w-3.5 h-3.5" />
                            Доставка завтра
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-xl font-black text-gray-900">
                            {(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽
                          </p>
                          {item.product.oldPrice && (
                            <p className="text-sm text-gray-400 line-through mt-0.5">
                              {(item.product.oldPrice * item.quantity).toLocaleString("ru-RU")} ₽
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-colors shadow-sm"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-bold text-gray-900 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-colors shadow-sm"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors hidden sm:block">
                            В избранное
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Удалить"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Delivery Info Block */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Способ получения</h4>
                <p className="text-sm text-gray-500">Курьером или в пункт выдачи. Точная стоимость и сроки будут рассчитаны при оформлении.</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight">
                Детали заказа
              </h2>
              
              <dl className="space-y-4 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <dt>Товары, {items.reduce((acc, item) => acc + item.quantity, 0)} шт.</dt>
                  <dd className="font-medium text-gray-900">
                    {items.reduce((sum, item) => sum + (item.product.oldPrice || item.product.price) * item.quantity, 0).toLocaleString("ru-RU")} ₽
                  </dd>
                </div>
                <div className="flex justify-between text-red-500">
                  <dt>Скидка</dt>
                  <dd className="font-medium">
                    -{items.reduce((sum, item) => sum + ((item.product.oldPrice || item.product.price) - item.product.price) * item.quantity, 0).toLocaleString("ru-RU")} ₽
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Доставка</dt>
                  <dd className="font-medium text-gray-900">Бесплатно</dd>
                </div>
              </dl>
              
              <div className="pt-6 border-t border-gray-100 mb-8">
                <div className="flex justify-between items-end mb-2">
                  <dt className="text-base font-bold text-gray-900">Итого</dt>
                  <dd className="text-3xl font-black text-gray-900 tracking-tight">
                    {totalPrice.toLocaleString("ru-RU")} ₽
                  </dd>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-4 px-8 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 mb-4"
              >
                Перейти к оформлению
              </motion.button>
              
              <p className="text-xs text-center text-gray-500 mb-6">
                Доступна оплата частями и в рассрочку
              </p>
              
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                  <span>Безопасная онлайн-оплата</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CreditCard className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>Оплата картой, СБП или наличными</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
