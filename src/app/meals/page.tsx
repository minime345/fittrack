"use client";

import { useState } from "react";
import Link from "next/link";
import { meals } from "@/data/meals";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const categories = ["all", "vegan", "keto", "balanced", "high-protein", "high-carb", "carnivore"];
const mealsPerPage = 6;

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-tr from-green-400 to-lime-500 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-md">
        F
      </div>
      <span className="text-xl md:text-2xl font-bold tracking-wide text-white">FitTrack</span>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm font-medium"
    >
      {label}
    </Link>
  );
}

export default function MealsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleMealsCount, setVisibleMealsCount] = useState(mealsPerPage);
  const [isOpen, setIsOpen] = useState(false);
    const currentYear = new Date().getFullYear();

  const filteredMeals =
    activeCategory === "all"
      ? meals
      : meals.filter(meal => meal.categories.includes(activeCategory));

  const visibleMeals = filteredMeals.slice(0, visibleMealsCount);

  const handleLoadMore = () => {
    setVisibleMealsCount(prev => prev + mealsPerPage);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white font-sans">
      {/* Навигация */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex gap-10">
            <NavLink href="/" label="Начало" />
            <NavLink href="/calculator" label="Калкулатор" />
            <NavLink href="/personal-plan" label="Персонални режими" />
            <NavLink href="/plans" label="Режими" />
            <NavLink href="/meals" label="Ястия" />
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-black/80 px-6 pb-4">
            <div className="flex flex-col gap-4">
              <NavLink href="/" label="Начало" />
              <NavLink href="/calculator" label="Калкулатор" />
              <NavLink href="/personal-plan" label="Персонални режими" />
              <NavLink href="/plans" label="Режими" />
              <NavLink href="/meals" label="Ястия" />
            </div>
          </div>
        )}
      </header>

      {/* Секция: Ястия */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-green-400 mb-8 text-center"
        >
          Всички Ястия
        </motion.h1>

        {/* Категории */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleMealsCount(mealsPerPage);
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                activeCategory === cat
                  ? "bg-green-500 text-black"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              {cat === "all" ? "Всички" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Карти с ястия */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleMeals.map((meal, i) => (
            <motion.div
              key={meal.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-900/60 hover:bg-gray-800/80 transition rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur"
            >
              {meal.link ? (
  <Link href={meal.link} className="block h-full">
    <div className="flex items-center gap-4 mb-4">
      <div className="text-4xl">{meal.icon}</div>
      <h2 className="text-xl font-bold text-green-400">{meal.name}</h2>
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-2">
      <div><span className="font-semibold text-white">Калории:</span> {meal.kcal}</div>
      <div><span className="font-semibold text-white">Протеин:</span> {meal.protein} г</div>
      <div><span className="font-semibold text-white">Въглехидрати:</span> {meal.carbs} г</div>
      <div><span className="font-semibold text-white">Мазнини:</span> {meal.fat} г</div>
    </div>
    <div className="text-xs text-gray-400 italic">
      Категории: {meal.categories.join(", ")}
    </div>
  </Link>
) : (
  <div className="block h-full cursor-default">
    <div className="flex items-center gap-4 mb-4">
      <div className="text-4xl">{meal.icon}</div>
      <h2 className="text-xl font-bold text-green-400">{meal.name}</h2>
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-2">
      <div><span className="font-semibold text-white">Калории:</span> {meal.kcal}</div>
      <div><span className="font-semibold text-white">Протеин:</span> {meal.protein} г</div>
      <div><span className="font-semibold text-white">Въглехидрати:</span> {meal.carbs} г</div>
      <div><span className="font-semibold text-white">Мазнини:</span> {meal.fat} г</div>
    </div>
    <div className="text-xs text-gray-400 italic mb-2">
      Категории: {meal.categories.join(", ")}
    </div>
    <div className="text-sm text-white mt-2 whitespace-pre-wrap">
      <span className="font-semibold text-green-400">Рецепта:</span> {meal.recipe}
    </div>
  </div>
)}
            </motion.div>
          ))}
        </div>

        {/* Бутон "Зареди още" */}
        {visibleMealsCount < filteredMeals.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-full transition"
            >
              Зареди още
            </button>
          </div>
        )}
      </section>
      {/* Footer секция */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Контакти */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Контакти</h3>
            <p>Email: <a href="mailto:info@fittrack.bg" className="text-green-400 hover:underline">fittrackwebsite@gmail.com</a></p>
            <p>Телефон: <a href="tel:+359888123456" className="text-green-400 hover:underline">+359 887 183 887</a></p>
            <p>Адрес: София, България</p>
          </div>

          {/* Бързи връзки */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Бързи връзки</h3>
            <ul className="space-y-2">
              <li><Link href="/calculator" className="hover:text-green-400">Калкулатор</Link></li>
              <li><Link href="/plans" className="hover:text-green-400">Режими</Link></li>
              <li><Link href="/meals" className="hover:text-green-400">Ястия</Link></li>
              <li><Link href="/personal-plan" className="hover:text-green-400">Персонални режими</Link></li>
            </ul>
          </div>

          {/* Социални мрежи */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Последвай ни</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.facebook.com/share/1GT8Ey98Re/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/semetoitsmaname?igsh=MXg1ZHg1NXYxMHl2dQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10 text-sm text-gray-500">
          © {currentYear} FitTrack. Всички права запазени.
        </div>
      </footer>
    </main>
  );
}
