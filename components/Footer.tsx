import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-serif font-medium tracking-tight text-gray-900"
            >
              Сон & Уют
            </Link>
            <p className="mt-4 text-sm text-gray-500 max-w-sm">
              Мы создаем мебель, которая превращает ваш дом в место силы.
              Премиальные материалы, современный дизайн и бескомпромиссный
              комфорт.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Каталог
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/catalog?category=beds"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Кровати
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=sofas"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Диваны
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Все товары
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Контакты
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="text-sm text-gray-500">+7 (495) 123-45-67</li>
              <li className="text-sm text-gray-500">hello@son-i-uyut.ru</li>
              <li className="text-sm text-gray-500">
                г. Москва, ул. Дизайнеров, 1
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Сон & Уют. Все права защищены.
          </p>
          <div className="mt-4 md:mt-0 space-x-6">
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-gray-900"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-gray-900"
            >
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
