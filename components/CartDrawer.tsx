"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./CartProvider";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    totalPrice,
  } = useCart();

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsCartOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-black text-gray-900 tracking-tight">
                          Корзина
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
                            onClick={() => setIsCartOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Закрыть панель</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-[50vh] space-y-4 text-center">
                              <div className="p-6 bg-gray-50 rounded-full">
                                <X className="w-12 h-12 text-gray-300" />
                              </div>
                              <div>
                                <p className="text-lg font-bold text-gray-900 mb-1">
                                  Ваша корзина пуста
                                </p>
                                <p className="text-sm text-gray-500 mb-6">
                                  Добавьте товары, чтобы оформить заказ
                                </p>
                              </div>
                              <button
                                onClick={() => setIsCartOpen(false)}
                                className="px-6 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors"
                              >
                                Перейти в каталог
                              </button>
                            </div>
                          ) : (
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-100"
                            >
                              {items.map((item) => (
                                <li key={item.product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 relative">
                                    <Image
                                      src={item.product.images[0]}
                                      alt={item.product.name}
                                      fill
                                      className="object-cover object-center"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-bold text-gray-900">
                                        <h3 className="line-clamp-2 text-sm leading-snug">
                                          <Link
                                            href={`/product/${item.product.id}`}
                                            onClick={() => setIsCartOpen(false)}
                                            className="hover:text-indigo-600 transition-colors"
                                          >
                                            {item.product.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4 whitespace-nowrap">
                                          {item.product.price.toLocaleString(
                                            "ru-RU",
                                          )}{" "}
                                          ₽
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm mt-4">
                                      <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                        <button
                                          onClick={() =>
                                            updateQuantity(
                                              item.product.id,
                                              item.quantity - 1,
                                            )
                                          }
                                          className="p-1 text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-colors"
                                        >
                                          <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-3 font-bold text-gray-900 min-w-[2rem] text-center">
                                          {item.quantity}
                                        </span>
                                        <button
                                          onClick={() =>
                                            updateQuantity(
                                              item.product.id,
                                              item.quantity + 1,
                                            )
                                          }
                                          className="p-1 text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-colors"
                                        >
                                          <Plus className="w-4 h-4" />
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            removeItem(item.product.id)
                                          }
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
                          )}
                        </div>
                      </div>
                    </div>

                    {items.length > 0 && (
                      <div className="border-t border-gray-100 px-4 py-6 sm:px-6 bg-gray-50">
                        <div className="flex justify-between text-lg font-black text-gray-900 mb-2">
                          <p>Итого</p>
                          <p>{totalPrice.toLocaleString("ru-RU")} ₽</p>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                          Доставка и скидки рассчитываются на следующем шаге
                        </p>
                        <div className="mt-6">
                          <Link
                            href="/cart"
                            onClick={() => setIsCartOpen(false)}
                            className="flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors w-full"
                          >
                            Перейти к оформлению
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
