"use client";

import Link from "next/link";

// Данни за ястието
const meal = {
  name: "Печена сьомга със задушени зеленчуци",
  slug: "salmon-veggies",
  icon: "🐟",
  kcal: 520,
  protein: 35,
  carbs: 10,
  fat: 38,
  weight: 400,
  ingredients: [
    { name: "Филе от сьомга", amount: "200 г", substitute: "пъстърва, бяла риба" },
    { name: "Броколи", amount: "100 г", substitute: "зелен фасул, аспержи" },
    { name: "Моркови", amount: "50 г", substitute: "цвекло, тиквички" },
    { name: "Зехтин", amount: "1 с.л. (10 г)", substitute: "масло, кокосово масло" },
    { name: "Лимон", amount: "1 резен", substitute: "лайм" },
    { name: "Сол и пипер", amount: "на вкус", substitute: "балсамов оцет, подправки" }
  ],
  recipeSteps: [
    "Загрей фурната на 200°C.",
    "Постави филето от сьомга в тава, поръси със сол, пипер и лимонов сок.",
    "Нарежи зеленчуците и ги овкуси със зехтин, сол и пипер.",
    "Постави зеленчуците около сьомгата във фурната.",
    "Печи за около 20-25 минути, докато сьомгата е готова и зеленчуците омекнат.",
    "Сервирай топло, като гарнираш с пресен лимон и зелени подправки по желание."
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

export default function SalmonVeggiesPage() {
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

        {/* Макроси */}
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

        {/* Стъпки */}
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
