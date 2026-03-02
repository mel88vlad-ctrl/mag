import { getProductById } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/ProductGallery";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Star, Truck, ShieldCheck, Clock, ChevronRight, Heart, Share2 } from "lucide-react";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-gray-900 transition-colors">Главная</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <Link href="/catalog" className="hover:text-gray-900 transition-colors">Каталог</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <Link href={`/catalog?category=${product.category}`} className="hover:text-gray-900 transition-colors">
            {product.category === 'beds' ? 'Кровати' : product.category === 'sofas' ? 'Диваны' : product.category === 'mattresses' ? 'Матрасы' : 'Аксессуары'}
          </Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Gallery */}
            <div>
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900">{product.rating}</span>
                  <span className="text-gray-500 underline cursor-pointer hover:text-gray-900">
                    {product.reviewsCount} отзывов
                  </span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="text-gray-500">Артикул: {product.id.toUpperCase()}</span>
              </div>

              <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {product.price.toLocaleString("ru-RU")} ₽
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {product.oldPrice.toLocaleString("ru-RU")} ₽
                    </span>
                  )}
                </div>
                
                <AddToCartButton product={product} />
              </div>

              {/* Delivery & Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl">
                  <Truck className="w-6 h-6 text-indigo-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Доставка</h4>
                    <p className="text-xs text-gray-500 mt-1">Завтра, бесплатно от 50 000 ₽</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Гарантия</h4>
                    <p className="text-xs text-gray-500 mt-1">5 лет на каркас, 18 мес. на ткань</p>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm text-gray-600 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Описание</h3>
                <p>{product.description}</p>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900">Характеристики</h3>
                
                {product.dimensions && (
                  <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100">
                    <div className="text-sm text-gray-500">Размеры</div>
                    <div className="col-span-2 text-sm font-medium text-gray-900">
                      {product.dimensions}
                    </div>
                  </div>
                )}

                {product.materials && (
                  <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100">
                    <div className="text-sm text-gray-500">Материалы</div>
                    <div className="col-span-2 text-sm font-medium text-gray-900">
                      {product.materials}
                    </div>
                  </div>
                )}

                {product.features && (
                  <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-100">
                    <div className="text-sm text-gray-500">Особенности</div>
                    <div className="col-span-2 text-sm font-medium text-gray-900">
                      <ul className="list-disc list-inside space-y-1">
                        {product.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
