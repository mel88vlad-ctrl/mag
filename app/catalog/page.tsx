import { products, getDiscountedProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Filter, ChevronDown } from "lucide-react";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category as string | undefined;
  const isDiscount = resolvedParams.discount === "true";

  let filteredProducts = products;
  let title = "Весь каталог";

  if (isDiscount) {
    filteredProducts = getDiscountedProducts();
    title = "Акции и скидки";
  } else if (category) {
    filteredProducts = products.filter((p) => p.category === category);
    switch (category) {
      case "beds":
        title = "Кровати";
        break;
      case "sofas":
        title = "Диваны";
        break;
      case "mattresses":
        title = "Матрасы";
        break;
      case "accessories":
        title = "Аксессуары";
        break;
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{title}</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              Найдено товаров: {filteredProducts.length}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 shadow-sm"
            >
              <Filter className="w-4 h-4" />
              Фильтры
            </button>
            
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:border-indigo-600 focus:ring-0 shadow-sm cursor-pointer">
                <option>Сначала популярные</option>
                <option>Сначала дешевле</option>
                <option>Сначала дороже</option>
                <option>Высокий рейтинг</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden md:block md:w-64 shrink-0">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 sticky top-28 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Категории</h3>
              <div className="space-y-3 mb-8">
                {['Кровати', 'Диваны', 'Матрасы', 'Аксессуары'].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">{cat}</span>
                  </label>
                ))}
              </div>

              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Цена, ₽</h3>
              <div className="flex items-center gap-2 mb-8">
                <input type="number" placeholder="От" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-600 focus:ring-0 transition-colors" />
                <span className="text-gray-400">-</span>
                <input type="number" placeholder="До" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-600 focus:ring-0 transition-colors" />
              </div>

              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Наличие</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">В наличии</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">Под заказ</span>
                </label>
              </div>

              <button className="w-full mt-8 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                Применить
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 font-medium">Товары не найдены</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
