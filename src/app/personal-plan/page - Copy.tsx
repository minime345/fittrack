"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { meals } from "@/data/meals";
import Link from "next/link";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { AnimatePresence} from "framer-motion";

import "@/fonts/Roboto-Regular.js";

type Goal = "maintain" | "lose" | "gain";
type Diet = "all" | "balanced" | "high-protein" | "keto" | "vegan" | "vegetarian";
type MeatType = 
  | "all"
  | "no-chicken"
  | "no-beef"
  | "no-pork"
  | "no-fish"
  | "no-supplements"
  | "no-vegan"
  | "no-egg"
  | "no-dairy";

export default function PersonalPlanPage() {
  const searchParams = useSearchParams();
  const baseCalories = Number(searchParams.get("calories")) || 2000;
  const currentYear = new Date().getFullYear();

  const [goal, setGoal] = useState<Goal>("maintain");
  const [diet, setDiet] = useState<Diet>("all");
  const [meatFilter, setMeatFilter] = useState<MeatType>("all");
  const [isOpen, setIsOpen] = useState(false);

  // Новите стейтове за модалния прозорец
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<typeof meals[0] | null>(null);

  const [weeklyPlan, setWeeklyPlan] = useState<
    {
      meals: {
        breakfast: typeof meals;
        lunch: typeof meals;
        dinner: typeof meals;
        snack: typeof meals;
      };
      total: { kcal: number; protein: number; carbs: number; fat: number };
    }[]
  >([]);

  const goalLabels: Record<Goal, string> = {
    maintain: "Поддържане",
    lose: "Отслабване",
    gain: "Качване",
  };

  const dietLabels: Record<Diet, string> = {
    all: "Всички",
    balanced: "Балансирана",
    "high-protein": "Високопротеинова",
    keto: "Кето",
    vegan: "Веган",
    vegetarian: "Вегетарианска",
  };

  const proteinMin = parseInt(searchParams.get("proteinMin") || "100", 10);
  const proteinMax = parseInt(searchParams.get("proteinMax") || "150", 10);

  function getTargetCalories(): number {
    const deficit = 0.15;
    switch (goal) {
      case "maintain":
        return baseCalories;
      case "lose":
        return Math.round(baseCalories * (1 - deficit));
      case "gain":
        return Math.round(baseCalories * (1 + deficit));
    }
  }

  // Филтриране по месо
  const filterByMeatType = (mealsList: typeof meals): typeof meals => {
    switch (meatFilter) {
      case "no-chicken":
        return mealsList.filter((m) => m.proteinSource !== "chicken");
      case "no-beef":
        return mealsList.filter((m) => m.proteinSource !== "beef");
      case "no-pork":
        return mealsList.filter((m) => m.proteinSource !== "pork");
      case "no-fish":
        return mealsList.filter((m) => m.proteinSource !== "fish");
      case "no-vegan":
        return mealsList.filter((m) => m.proteinSource !== "vegan");
      case "no-egg":
        return mealsList.filter((m) => m.proteinSource !== "egg");
      case "no-supplements":
        return mealsList.filter((m) => m.proteinSource !== "supplement");
      case "no-dairy":
        return mealsList.filter((m) => m.proteinSource !== "dairy");
      default:
        return mealsList;
    }
    
  };
useEffect(() => {
  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [showModal]);
  useEffect(() => {
  const dailyCalories = getTargetCalories();

  // Филтриране по диета
  let filtered = diet === "all" ? meals : meals.filter((m) => m.categories.includes(diet));
  // Филтриране по месо
  filtered = filterByMeatType(filtered);

  // Генериране на 7-дневен план
  const weekPlan = Array.from({ length: 7 }, () =>
    generateDayPlan(filtered, dailyCalories)
  );

  setWeeklyPlan(weekPlan);
}, [baseCalories, goal, diet, meatFilter]);

const generateDayPlan = (
  pool: typeof meals,
  target: number
): {
  meals: {
    breakfast: typeof meals;
    lunch: typeof meals;
    dinner: typeof meals;
    snack: typeof meals;
  };
  total: { kcal: number; protein: number; carbs: number; fat: number };
} => {
  const pickRandom = (list: typeof meals, count = 1): typeof meals => {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const filterByMealType = (type: string) => pool.filter((m) => m.mealType.includes(type));

  const breakfastCount = target >= 3300 ? 2 : 1;
  const lunchCount = target < 1500 ? 1 : target < 1800 ? 1 : 2;
  const dinnerCount = target >= 2800 ? 2 : 1;
  const snackCount = target < 1500 ? 0 : target < 1800 ? 1 : 2;

  const breakfasts = pickRandom(filterByMealType("breakfast"), breakfastCount);
  const lunches = pickRandom(filterByMealType("lunch"), lunchCount);
  const dinners = pickRandom(filterByMealType("dinner"), dinnerCount);
  const snacks = pickRandom(filterByMealType("snack"), snackCount);

  const selectedMeals = {
    breakfast: breakfasts,
    lunch: lunches,
    dinner: dinners,
    snack: snacks,
  };

  // Калкулиране на макросите
  const total = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

  const sumMacros = (mealList: typeof meals) => {
    for (const m of mealList) {
      total.kcal += m.kcal;
      total.protein += m.protein;
      total.carbs += m.carbs;
      total.fat += m.fat;
    }
  };

  Object.values(selectedMeals).forEach(sumMacros);

  // Оставащи ястия (избягваме дублиране)
  const usedSlugs = new Set(
    [...selectedMeals.breakfast, ...selectedMeals.lunch, ...selectedMeals.dinner, ...selectedMeals.snack].map(
      (m) => m.slug
    )
  );
  const remaining = pool.filter((m) => !usedSlugs.has(m.slug));

  // Добавяме допълнителни снаксове ако е нужно (само при по-високи цели)
  if (target > 1500) {
    for (const snack of remaining.sort(() => 0.5 - Math.random())) {
      if (!snack.mealType.includes("snack")) continue;
      if (total.kcal + snack.kcal > target + 50) continue;

      selectedMeals.snack.push(snack);
      total.kcal += snack.kcal;
      total.protein += snack.protein;
      total.carbs += snack.carbs;
      total.fat += snack.fat;

      if (total.kcal >= target - 50) break;
    }
  }

  return { meals: selectedMeals, total };
};


  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFont("Roboto", "normal");
    doc.setFontSize(16);
    doc.text("Персонален хранителен режим", 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Цел: ${goalLabels[goal]} / Диета: ${dietLabels[diet]}`, 10, y);
    y += 10;

    weeklyPlan.forEach((day, i) => {
      doc.setFontSize(13);
      doc.setTextColor(0, 128, 0);
      doc.text(`Ден ${i + 1}`, 10, y);
      y += 8;

      doc.setTextColor(0, 0, 0);

      const sections = ["breakfast", "lunch", "dinner", "snack"] as const;

      sections.forEach((section) => {
        const mealsArr = day.meals[section];
        if (mealsArr.length === 0) return;

        doc.setFontSize(12);
        doc.setTextColor(0, 102, 204);
        doc.text(section.charAt(0).toUpperCase() + section.slice(1), 12, y);
        y += 6;

        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);

        mealsArr.forEach((meal) => {
          if (y > 270) {
            doc.addPage();
            y = 10;
            doc.setFont("Roboto", "normal");
          }
          const text = `• ${meal.name} – ${meal.kcal} kcal, P: ${meal.protein}g, C: ${meal.carbs}g, F: ${meal.fat}g`;
          doc.textWithLink(text, 14, y, {
            url: meal.link ? `https://yourdomain.com${meal.link}` : undefined,
          });
          y += 6;
        });

        y += 4;
      });

      const summary = `Общо: ${day.total.kcal} kcal / P: ${day.total.protein}g / C: ${day.total.carbs}g / F: ${day.total.fat}g`;
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(summary, 12, y);
      y += 12;
    });

    doc.save("hranitelen-rezhim.pdf");
  };

  function Logo() {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-tr from-green-400 to-lime-500 rounded-full flex items-center justify-center text-black font-bold text-base sm:text-lg shadow-md">
          F
        </div>
        <span className="text-lg sm:text-xl font-bold tracking-wide text-white">FitTrack</span>
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex gap-5">
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
          <div className="md:hidden bg-black/90 px-6 pb-4">
            <div className="flex flex-col gap-3">
              <NavLink href="/" label="Начало" />
              <NavLink href="/calculator" label="Калкулатор" />
              <NavLink href="/personal-plan" label="Персонални режими" />
              <NavLink href="/plans" label="Режими" />
              <NavLink href="/meals" label="Ястия" />
            </div>
          </div>
        )}
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400 text-center mb-8"
        >
          Персонален хранителен режим
        </motion.h1>

        {baseCalories === 2000 && (
          <div className="text-center mb-6">
            <p className="mb-3 text-yellow-400 text-sm sm:text-base">
              ⚠️ Използвани са стандартни стойности от <strong>2000 kcal</strong>.
            </p>
            <Link href="/calculator">
              <button className="bg-green-500 text-black font-semibold px-4 py-2 rounded hover:bg-green-400 transition text-sm">
                Изчисли своите калории
              </button>
            </Link>
          </div>
        )}

        <div className="bg-gray-800 p-4 rounded-xl shadow-md text-white space-y-2 border border-green-500 mb-8 text-sm sm:text-base">
          <p>
            <span className="text-green-400 font-semibold">Калории за поддържане:</span> {baseCalories} kcal
          </p>
          <p>
            <span className="text-green-400 font-semibold">За отслабване:</span> {Math.round(baseCalories * 0.85)} kcal
          </p>
        <p>
            <span className="text-green-400 font-semibold">За качване:</span> {Math.round(baseCalories * 1.15)} kcal
          </p>

          <span className="text-green-400 font-semibold">Протеин:</span> {proteinMin} – {proteinMax} g


        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-10 text-sm">
          <div>
            <label className="block mb-1">Цел</label>
            <select
              className="bg-gray-800 text-white rounded px-3 py-2 w-full min-w-[160px]"
              value={goal}
              onChange={(e) => setGoal(e.target.value as Goal)}
            >
              {Object.entries(goalLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Диета</label>
            <select
              className="bg-gray-800 text-white rounded px-3 py-2 w-full min-w-[160px]"
              value={diet}
              onChange={(e) => setDiet(e.target.value as Diet)}
            >
              {Object.entries(dietLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
  <label className="block mb-1">Опция "Без"</label>
 <select
    className="bg-gray-800 text-white rounded px-3 py-2 w-full min-w-[160px]"
    value={meatFilter}
    onChange={(e) => setMeatFilter(e.target.value as MeatType)}
    >
  <option value="all">Без изключване</option>
  <option value="no-chicken">Без пиле</option>
  <option value="no-beef">Без говеждо</option>
  <option value="no-pork">Без свинско</option>
  <option value="no-fish">Без риба</option>
  <option value="no-supplements">Без добавки</option>
  <option value="no-vegan">Без веган протеини</option>
  <option value="no-egg">Без яйца</option>
  <option value="no-dairy">Без млечни продукти</option>
</select>
</div>

<div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-green-500/40 rounded-xl p-5 text-sm sm:text-base text-gray-200 shadow-inner mb-8">
  <h2 className="text-green-400 text-lg font-semibold mb-2 flex items-center gap-2">
    🧠 Информация за режима
  </h2>
  <ul className="space-y-1 list-disc list-inside text-gray-300">
    <li>
      Този хранителен режим е <span className="text-green-400 font-medium">автоматично генериран</span> според въведените калории, цел и тип диета.
    </li>
    <li>
      Ястията са избрани така, че да балансират калориите и протеина за деня.
    </li>
    <li>
      Може да <span className="text-green-400 font-medium">редувате ястията</span> по свое желание – закуските могат да се хапват като междинни хранения и обратно.
    </li>
    <li>
      Ако не харесвате дадено ястие, презаредете страницата или променете филтрите, за да получите нова комбинация.
    </li>
    <li>
      Месото в режима се съобразява с избраните предпочитания – ако сте посочили <span className="text-green-400 font-medium">„без пиле“</span>, то няма да бъде включено.
    </li>
  </ul>
</div>

        </div>


      {/* --- Десктоп: таблица с разграфяване --- */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg border border-gray-800 bg-gray-900 text-gray-100 max-w-full">
        <table className="min-w-full table-fixed border-collapse divide-y divide-gray-700">
          <thead>
            <tr className="bg-gray-800 text-green-400 uppercase text-xs tracking-wider select-none border-b border-gray-600">
              <th className="w-[80px] py-3 px-4 border-r border-gray-700 rounded-tl-md">Ден</th>
              <th className="w-[180px] py-3 px-4 border-r border-gray-700">Закуска</th>
              <th className="w-[180px] py-3 px-4 border-r border-gray-700">Обяд</th>
              <th className="w-[180px] py-3 px-4 border-r border-gray-700">Вечеря</th>
              <th className="w-[140px] py-3 px-4 border-r border-gray-700">Снакс</th>
              <th className="w-[140px] py-3 px-4 rounded-tr-md">Макроси</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {weeklyPlan.map((day, idx) => (
              <tr
                key={idx}
                className="bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <td className="border-r border-gray-700 py-4 px-4 font-semibold text-green-400 text-center whitespace-nowrap rounded-bl-md">
                  Ден {idx + 1}
                </td>

                {(["breakfast", "lunch", "dinner", "snack"] as const).map((mealType) => (
                  <td
                    key={mealType}
                    className="border-r border-gray-700 py-4 px-4 align-top max-w-[180px] text-gray-300 whitespace-normal break-words"
                  >
                    {day.meals[mealType].length > 0 ? (
                      day.meals[mealType].map((meal) => (
                        <div
                          key={meal.slug}
                          className="flex items-center gap-2 text-sm mb-1"
                          title={meal.name}
                        >
                          <span className="text-xl select-none">{meal.icon || "🍽️"}</span>
                          {meal.link ? (
  <Link
    href={meal.link}
    className="text-green-300 hover:text-green-400 no-underline"
  >
    {meal.name}
  </Link>
) : (
  <button
    onClick={() => {
      setSelectedMeal(meal);
      setShowModal(true);
    }}
    className="text-green-300 hover:text-green-400 text-left focus:outline-none"
  >
    {meal.name}
  </button>
)}
                        </div>
                      ))
                    ) : (
                      <span className="italic text-gray-600">—</span>
                    )}
                  </td>
                ))}

                <td className="py-4 px-4 text-xs font-mono text-green-400 text-center whitespace-nowrap">
                  <div>Калории: <span className="font-semibold">{day.total.kcal}</span> kcal</div>
                  <div>Протеин: <span className="font-semibold">{day.total.protein}</span> g</div>
                  <div>Въглехидрати: <span className="font-semibold">{day.total.carbs}</span> g</div>
                  <div>Мазнини: <span className="font-semibold">{day.total.fat}</span> g</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* --- Мобилна версия: flex колони с разграфяване --- */}
      <div className="block md:hidden rounded-lg shadow-lg border border-gray-800 bg-gray-900 text-gray-100 max-w-full p-4 divide-y divide-gray-700">
        {weeklyPlan.map((day, idx) => (
          <div key={idx} className="py-4">
            <div className="text-green-400 font-semibold text-lg mb-3 text-center border-b border-gray-700 pb-2">
              Ден {idx + 1}
            </div>

            {(["breakfast", "lunch", "dinner", "snack"] as const).map((mealType) => (
              <div key={mealType} className="mb-3 border-b border-gray-700 last:border-b-0 pb-2">
                <div className="text-green-400 font-semibold mb-1 uppercase tracking-wide text-xs select-none">
                  {mealType === "breakfast" ? "Закуска" :
                   mealType === "lunch" ? "Обяд" :
                   mealType === "dinner" ? "Вечеря" :
                   "Снакс"}
                </div>
                {day.meals[mealType].length > 0 ? (
                  <div className="space-y-1 text-green-300 text-sm">
                    {day.meals[mealType].map((meal) => (
                      <div
                        key={meal.slug}
                        className="flex items-center gap-2 break-words"
                        title={meal.name}
                      >
                        <span className="text-xl select-none">{meal.icon || "🍽️"}</span>
                        {meal.link ? (
                          <Link
                            href={meal.link}
                            className="hover:text-green-400 no-underline"
                          >
                            {meal.name}
                          </Link>
                        ) : (
                          <span>{meal.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="italic text-gray-600">—</span>
                )}
              </div>
            ))}

            <div className="text-green-400 font-mono text-xs space-y-1 mt-3 text-center border-t border-gray-700 pt-3">
              <div>Калории: <span className="font-semibold">{day.total.kcal}</span> kcal</div>
              <div>Протеин: <span className="font-semibold">{day.total.protein}</span> g</div>
              <div>Въглехидрати: <span className="font-semibold">{day.total.carbs}</span> g</div>
              <div>Мазнини: <span className="font-semibold">{day.total.fat}</span> g</div>
            </div>
          </div>
        ))}
      </div>

      </section>

      {/* Бутон Изтегли PDF в долната част */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex justify-center">
  <button
    onClick={downloadPDF}
    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow transition-colors max-w-xs w-full sm:w-auto"
  >
    Изтегли PDF
  </button>
      </footer>
      {/* Footer секция */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Контакти */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Контакти</h3>
            <p>Email: <a href="mailto:info@fittrack.bg" className="text-green-400 hover:underline">info@fittrack.bg</a></p>
            <p>Телефон: <a href="tel:+359888123456" className="text-green-400 hover:underline">+359 888 123 456</a></p>
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
              <li><a href="#" className="hover:text-green-400">Facebook</a></li>
              <li><a href="#" className="hover:text-green-400">Instagram</a></li>
              <li><a href="#" className="hover:text-green-400">YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10 text-sm text-gray-500">
          © {currentYear} FitTrack. Всички права запазени.
        </div>
      </footer>
      <AnimatePresence>
  {showModal && selectedMeal && (
    <motion.div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 text-white rounded-xl p-6 w-[90%] max-w-md shadow-lg border border-green-500 relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
        >
          ×
        </button>
        <h2 className="text-green-400 text-xl font-semibold mb-2 flex items-center gap-2">
          {selectedMeal.icon} {selectedMeal.name}
        </h2>
        <p className="text-sm mb-3 text-gray-300">{selectedMeal.recipe}</p>
        <div className="text-sm text-gray-400 space-y-1 font-mono">
          <div>Калории: <span className="text-white">{selectedMeal.kcal}</span> kcal</div>
          <div>Протеин: <span className="text-white">{selectedMeal.protein}</span> g</div>
          <div>Въглехидрати: <span className="text-white">{selectedMeal.carbs}</span> g</div>
          <div>Мазнини: <span className="text-white">{selectedMeal.fat}</span> g</div>
          <div>Тегло: <span className="text-white">{selectedMeal.weight}</span> g</div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </main>
  );
}
