"use client";

import Link from "next/link";

// Данните за овесената каша
const meal = {
  name: "Овесена каша с банан и фъстъчено масло",
  slug: "oatmeal-banana-pb",
  icon: "🥣",
  kcal: 400,
  protein: 14,
  carbs: 45,
  fat: 18,
  weight: 350,
  image: "/images/oats.jpg",
  ingredients: [
    { name: "Фини овесени ядки", amount: "50 г", substitute: "елда, киноа" },
    { name: "Банан", amount: "1 бр (120 г)", substitute: "ябълка, круша" },
    { name: "Фъстъчено масло", amount: "1 с.л. (15 г)", substitute: "бадемово масло, тахан" },
    { name: "Ядково мляко (или вода)", amount: "200 мл", substitute: "обезмаслено мляко" },
    { name: "Канела (по избор)", amount: "½ ч.л.", substitute: "ванилия, какао" }
  ],
  recipeSteps: [
    "Сипи ядковото мляко (или вода) в тенджера и го загрей до завиране.",
    "Добави овесените ядки и вари 5-7 минути на слаб огън, като разбъркваш.",
    "Намачкай банана и го добави към кашата.",
    "Разбъркай и добави фъстъченото масло.",
    "Подправи с канела и сервирай топло. Можеш да гарнираш с още банан или ядки по желание."
  ]
};

// Лого компонент
function Logo() {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-xl">F</div>
      <span className="ml-3 text-2xl font-bold text-white">FitTrack</span>
    </div>
  );
}

export default function OatmealBananaPBPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Навигация */}
      <nav className="flex items-center justify-between max-w-6xl mx-auto px-6 py-6 border-b border-gray-700">
        <Logo />
        <div className="space-x-8">
          <Link href="/" className="text-gray-300 hover:text-green-400 font-semibold transition">Начало</Link>
          <Link href="/calculator" className="text-gray-300 hover:text-green-400 font-semibold transition">Калкулатор</Link>
          <Link href="/personal-plan" className="text-gray-300 hover:text-green-400 font-semibold transition">Персонални режими</Link>
          <Link href="/plans" className="text-gray-300 hover:text-green-400 font-semibold transition">Режими</Link>
          <Link href="/meals" className="text-gray-300 hover:text-green-400 font-semibold transition">Ястия</Link>
        </div>
      </nav>

      {/* Съдържание */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-6xl">{meal.icon}</span>
          <h1 className="text-4xl font-bold text-green-400">{meal.name}</h1>
        </div>

        {meal.image && (
          <img
            src={meal.image}
            alt={meal.name}
            className="rounded-xl mb-10 w-full max-h-96 object-cover"
          />
        )}

        {/* Макронутриенти */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 bg-gray-800 p-6 rounded-xl mb-10 text-center">
          <div>
            <div className="text-3xl font-bold text-green-400">{meal.kcal}</div>
            <div className="text-sm text-gray-300">Калории</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">{meal.protein} г</div>
            <div className="text-sm text-gray-300">Протеин</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">{meal.carbs} г</div>
            <div className="text-sm text-gray-300">Въглехидрати</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">{meal.fat} г</div>
            <div className="text-sm text-gray-300">Мазнини</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">{meal.weight} г</div>
            <div className="text-sm text-gray-300">Грамаж</div>
          </div>
        </div>

        {/* Съставки */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">Съставки</h2>
          <ul className="space-y-2">
            {meal.ingredients.map((item, idx) => (
              <li key={idx} className="bg-gray-800 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <span className="text-green-400 font-bold">{item.name}</span>
                  <span className="text-gray-400 text-sm block">Заместител: {item.substitute}</span>
                </div>
                <span className="text-gray-200 font-semibold">{item.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Стъпки за приготвяне */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Начин на приготвяне</h2>
          <ol className="list-decimal list-inside space-y-3 text-lg text-gray-200 leading-relaxed">
            {meal.recipeSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
