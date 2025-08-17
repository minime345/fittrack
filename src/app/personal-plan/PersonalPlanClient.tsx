"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { meals } from "@/data/meals";
import Link from "next/link";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { translations, type Lang } from "@/lib/translations-plans";
import { useLang } from "@/context/LangContext";
import "@/fonts/Roboto-Regular.js";
import { Main } from "next/document";

type LocalizedString = { bg: string; en: string };
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
  type Ingredient = {
  name: { bg: string; en: string };
  amount: number;
  unit: string;
};

export default function PersonalPlanPage() {
  const searchParams = useSearchParams();
  const baseCalories = Number(searchParams.get("calories")) || 2000;
 const currentYear = new Date().getFullYear();
const [showShoppingList, setShowShoppingList] = useState(false);
const [lang, setLang] = useState<Lang>("bg"); // default bg
     useEffect(() => {
        const saved = localStorage.getItem("lang");
        if (saved === "en" || saved === "bg") {
          setLang(saved);
        }
      }, []);
    
      const toggleLang = () => {
        const newLang = lang === "bg" ? "en" : "bg";
        setLang(newLang);
        localStorage.setItem("lang", newLang);
      };
      const t = translations[lang] || translations.bg;

  const [goal, setGoal] = useState<Goal>("maintain");
  const [diet, setDiet] = useState<Diet>("all");
  const [meatFilter, setMeatFilter] = useState<MeatType>("all");
  const [isOpen, setIsOpen] = useState(false);

  // Новите стейтове за модалния прозорец
  const [showModal, setShowModal] = useState(false);
  type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

function generateShoppingList() {
  const ingredientMap = new Map<string, Ingredient>();

  // Обхождаме всеки ден от седмичния план
  weeklyPlan.forEach((day) => {
    // Взимаме всички ястия за деня
    const allMeals = [
      ...day.meals.breakfast,
      ...day.meals.lunch,
      ...day.meals.dinner,
      ...day.meals.snack,
    ];

    // Обхождаме всяко ястие и неговите съставки
    allMeals.forEach((meal) => {
      meal.ingredients?.forEach(({ name, amount, unit }) => {
  const ingredientName = typeof name === "string" ? name : name[lang];
  const key = `${ingredientName}_${unit}`;
  if (ingredientMap.has(key)) {
    ingredientMap.get(key)!.amount += amount;
  } else {
    ingredientMap.set(key, { name: ingredientName, amount, unit });
  }
});
    });
  });

  // Връщаме масив от съставки, сортиран по име
  return Array.from(ingredientMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

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
    maintain: t.Main.maintain,
    lose: t.Main.lose,
    gain: t.Main.gain,
  };

const dietLabels: Record<Diet, string> = t.Main.diet;

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
  const lunchCount = target < 1500 ? 1 : target < 2300 ? 1 : 2;
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
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 15;

  // Поддържаме кирилица с Roboto
  doc.setFont("Roboto", "normal");

  // Title Section
  doc.setFillColor(230, 247, 230); // светло зелено
  doc.roundedRect(8, y - 8, pageWidth - 16, 20, 3, 3, "F");
  doc.setFontSize(18);
  doc.setTextColor(0, 128, 0);
  doc.text(t.Main.pdfTitle, pageWidth / 2, y + 4, { align: "center" });
  y += 20;

  // Goal & Diet
  doc.setFontSize(12);
  doc.setTextColor(50, 50, 50);
  doc.text(`${t.Main.goalLabel}: ${goalLabels[goal]} / ${t.Main.dietLabel}: ${dietLabels[diet]}`, 12, y);
  y += 12;

  // Weekly Plan
  weeklyPlan.forEach((day, i) => {
    // Day Header Card
    doc.setFillColor(240, 255, 240);
    doc.roundedRect(8, y - 6, pageWidth - 16, 8, 2, 2, "F");
    doc.setFontSize(14);
    doc.setTextColor(0, 128, 0);
    doc.text(`${t.Main.day} ${i + 1}`, 12, y);
    y += 8;

    doc.setTextColor(0, 0, 0);

    const sections = [
      { key: "breakfast", label: t.Main.breakfast },
      { key: "lunch", label: t.Main.lunch },
      { key: "dinner", label: t.Main.dinner },
      { key: "snack", label: t.Main.snack },
    ] as const;

    sections.forEach((section) => {
      const mealsArr = day.meals[section.key];
      if (mealsArr.length === 0) return;

      // Section Name
      doc.setFontSize(12);
      doc.setTextColor(0, 102, 204);
      doc.text(section.label, 14, y);
      y += 6;

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);

      mealsArr.forEach((meal) => {
        if (y > 270) {
          doc.addPage();
          y = 15;
          doc.setFont("Roboto", "normal");
        }
        const text = `• ${meal.name[lang]} – ${meal.kcal} kcal, P: ${meal.protein}g, C: ${meal.carbs}g, F: ${meal.fat}g`;
        doc.textWithLink(text, 16, y, {
          url: meal.link ? `https://yourdomain.com${meal.link}` : undefined,
        });
        y += 6;
      });

      y += 4;
    });

    // Day Summary
    const summary = `${t.Main.total}: ${day.total.kcal} kcal / P: ${day.total.protein}g / C: ${day.total.carbs}g / F: ${day.total.fat}g`;
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text(summary, 14, y);
    y += 12;
  });

  // Shopping List Title
  if (y > 260) {
    doc.addPage();
    y = 15;
  }
  doc.setFillColor(230, 247, 230);
  doc.roundedRect(8, y - 6, pageWidth - 16, 10, 3, 3, "F");
  doc.setFontSize(14);
  doc.setTextColor(0, 128, 0);
  doc.text(t.Main.shoppingTitle, 12, y);
  y += 12;

  // Shopping List Items
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  const shoppingList = generateShoppingList();
  shoppingList.forEach(({ name, amount, unit }) => {
    if (y > 270) {
      doc.addPage();
      y = 15;
    }
    doc.text(`• ${name} - ${amount} ${unit}`, 14, y);
    y += 6;
  });

  doc.save("hranitelen-rezhim.pdf");
};


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

  return (
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white font-sans">
       <header className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-md">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                 <Logo />
             
                 <div className="flex items-center gap-6">
                   {/* Навигация за десктоп */}
                   <nav className="hidden md:flex gap-10">
                     <NavLink href="/" label={t.nav.home} />
                     <NavLink href="/calculator" label={t.nav.calculator} />
                     <NavLink href="/personal-plan" label={t.nav.personal} />
                     <NavLink href="/plans" label={t.nav.plans} />
                     <NavLink href="/meals" label={t.nav.meals} />
                   </nav>
             
                   {/* Бутон за смяна на език – остава само един път */}
                   <button
                     onClick={toggleLang}
                     aria-label="Switch language"
                     className="px-3 py-1 border border-green-400 text-green-400 rounded-lg hover:bg-green-500 hover:text-black transition text-sm font-medium"
                   >
                     {lang === "bg" ? "BG" : "EN"}
                   </button>
             
                   {/* Mobile menu button */}
                   <div className="md:hidden">
                     <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                       <Menu className="w-6 h-6 text-white" />
                     </button>
                   </div>
                 </div>
               </div>
             
               {/* Mobile menu – без бутон за език вътре */}
               {isOpen && (
                 <div className="md:hidden bg-black/80 px-6 pb-4">
                   <div className="flex flex-col gap-4">
                     <NavLink href="/" label={t.nav.home} />
                     <NavLink href="/calculator" label={t.nav.calculator} />
                     <NavLink href="/personal-plan" label={t.nav.personal} />
                     <NavLink href="/plans" label={t.nav.plans} />
                     <NavLink href="/meals" label={t.nav.meals} />
                   </div>
                 </div>
               )}
             </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
  <motion.h1
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300 text-center mb-6"
  >
    {t.Main.heading}
  </motion.h1>

  {baseCalories === 2000 && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-center mb-4"
    >
      <p className="text-yellow-400 text-sm">{t.Main.warning}</p>
      <Link href="/calculator">
        <button className="mt-2 bg-green-500 text-black font-semibold px-4 py-1 rounded-lg hover:bg-green-400 transition text-sm">
          {t.Main.calculateButton}
        </button>
      </Link>
    </motion.div>
  )}

  <div className="bg-gray-800 px-4 py-3 rounded-lg shadow-md text-white border border-green-500 text-base sm:text-lg w-full sm:max-w-md mx-auto">
  <div className="flex justify-between items-center">
    <span className="text-green-400 font-semibold">
      {t.Main.calculateButton} {goalLabels[goal]}:
    </span>
    <span>{getTargetCalories()} kcal</span>
  </div>
  <div className="flex justify-between items-center border-t border-gray-700 mt-2 pt-2">
     <span className="text-green-400 font-semibold">{t.Main.proteinLabel}:</span>
    <span>{proteinMin} – {proteinMax} g</span>
  </div>
</div>

  <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-10 text-sm">
          <div>
             <label className="block mb-1">{t.Main.goalLabel}</label>
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
            <label className="block mb-1">{t.Main.dietLabel}</label>
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
  <label className="block mb-1">{t.Main.meatFilterLabel}</label>
 <select
    className="bg-gray-800 text-white rounded px-3 py-2 w-full min-w-[160px]"
    value={meatFilter}
    onChange={(e) => setMeatFilter(e.target.value as MeatType)}
    >
 <option value="all">{t.Main.meatOptions.all}</option>
        <option value="no-chicken">{t.Main.meatOptions.noChicken}</option>
        <option value="no-beef">{t.Main.meatOptions.noBeef}</option>
        <option value="no-pork">{t.Main.meatOptions.noPork}</option>
        <option value="no-fish">{t.Main.meatOptions.noFish}</option>
        <option value="no-supplements">{t.Main.meatOptions.noSupplements}</option>
        <option value="no-vegan">{t.Main.meatOptions.noVegan}</option>
        <option value="no-egg">{t.Main.meatOptions.noEgg}</option>
        <option value="no-dairy">{t.Main.meatOptions.noDairy}</option>
</select>
</div>

<div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-green-500/40 rounded-xl p-3 text-xs sm:text-sm text-gray-200 shadow-inner mb-6">
      <h2 className="text-green-400 text-base font-semibold mb-1 flex items-center gap-2">
        {t.Main.infoHeading}
      </h2>
      <ul className="space-y-0.5 list-disc list-inside text-gray-300">
        {t.Main.infoItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>




      {/* --- Десктоп: таблица с разграфяване --- */}
  <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg border border-gray-800 bg-gray-900 text-gray-100 max-w-full">
  <table className="min-w-full table-fixed border-collapse divide-y divide-gray-700">
    <thead>
      <tr className="bg-gray-800 text-green-400 uppercase text-xs tracking-wider select-none border-b border-gray-600">
        <th className="w-[80px] py-3 px-4 border-r border-gray-700 rounded-tl-md">{t.Main.day}</th>
        <th className="w-[180px] py-3 px-4 border-r border-gray-700">{t.Main.breakfast}</th>
        <th className="w-[180px] py-3 px-4 border-r border-gray-700">{t.Main.lunch}</th>
        <th className="w-[180px] py-3 px-4 border-r border-gray-700">{t.Main.dinner}</th>
        <th className="w-[240px] py-3 px-4 border-r border-gray-700">{t.Main.snack}</th>
        <th className="w-[80px] py-3 px-4 rounded-tr-md">{t.Main.macros}</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-700">
      {weeklyPlan.map((day, idx) => (
        <tr
          key={idx}
          className="bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <td className="border-r border-gray-700 py-4 px-4 font-semibold text-green-400 text-center whitespace-nowrap rounded-bl-md">
            {t.Main.day} {idx + 1}
          </td>

          {(["breakfast", "lunch", "dinner", "snack"] as const).map((mealType) => (
            <td
              key={mealType}
              className={`border-r border-gray-700 py-4 px-4 align-top text-gray-300 whitespace-normal break-words ${
                mealType === "snack" ? "max-w-[220px]" : "max-w-[180px]"
              }`}
            >
              {day.meals[mealType].length > 0 ? (
                day.meals[mealType].map((meal) => (
                  <div
                    key={meal.slug}
                    className="flex items-center gap-2 text-sm mb-1"
                    title={meal.name[lang]}
                  >
                    <span className="text-xl select-none">{meal.icon || "🍽️"}</span>
                    {meal.link ? (
                      <Link
                        href={meal.link}
                        className="text-green-300 hover:text-green-400 no-underline"
                      >
                        {meal.name[lang]}
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedMeal(meal);
                          setShowModal(true);
                        }}
                        className="text-green-300 hover:text-green-400 text-left focus:outline-none"
                      >
                        {meal.name[lang]}
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
            <div>{t.Main.calories} <span className="font-semibold">{day.total.kcal}</span> kcal</div>
            <div>{t.Main.proteinLabel} <span className="font-semibold">{day.total.protein}</span> g</div>
            <div>{t.Main.carb}<span className="font-semibold">{day.total.carbs}</span> g</div>
            <div>{t.Main.fat} <span className="font-semibold">{day.total.fat}</span> g</div>
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
        {t.Main.day} {idx + 1}
      </div>

      {(["breakfast", "lunch", "dinner", "snack"] as const).map((mealType) => (
        <div key={mealType} className="mb-3 border-b border-gray-700 last:border-b-0 pb-2">
          <div className="text-green-400 font-semibold mb-1 uppercase tracking-wide text-xs select-none">
            {mealType === "breakfast" ? t.Main.breakfast :
             mealType === "lunch" ? t.Main.lunch :
             mealType === "dinner" ? t.Main.dinner :
             t.Main.snack}
          </div>
          {day.meals[mealType].length > 0 ? (
            <div className="space-y-1 text-green-300 text-sm">
              {day.meals[mealType].map((meal) => (
                <div
                  key={meal.slug}
                  className="flex items-center gap-2 break-words"
                  title={meal.name[lang]}
                >
                  <span className="text-xl select-none">{meal.icon || "🍽️"}</span>
                  {meal.link ? (
                    <Link
                      href={meal.link}
                      className="hover:text-green-400 no-underline"
                    >
                      {meal.name[lang]}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedMeal(meal);
                        setShowModal(true);
                      }}
                      className="text-green-300 hover:text-green-400 text-left focus:outline-none"
                    >
                      {meal.name[lang]}
                    </button>
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
        <div>{t.Main.calories} <span className="font-semibold">{day.total.kcal}</span> kcal</div>
        <div>{t.Main.proteinLabel} <span className="font-semibold">{day.total.protein}</span> g</div>
        <div>{t.Main.carb} <span className="font-semibold">{day.total.carbs}</span> g</div>
        <div>{t.Main.fat} <span className="font-semibold">{day.total.fat}</span> g</div>
      </div>
    </div>
  ))}
</div>

</section>

{/* Бутоните долу */}
<footer className="bg-gray-900 text-gray-300 py-12 mt-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t.footer.contacts}</h3>
            <p>
             Email:{" "}
              <a href="mailto:fittrackwebsite@gmail.com" className="text-green-400 hover:underline">
                fittrackwebsite@gmail.com
              </a>
            </p>
            <p>
              {t.footer.phone}:{" "}
              <a href="tel:+359887183887" className="text-green-400 hover:underline">
                +359 887 183 887
              </a>
            </p>
            <p>
              {t.footer.address}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t.footer.quick}</h3>
            <ul className="space-y-2">
              <li><Link href="/calculator" className="hover:text-green-400">{t.nav.calculator}</Link></li>
              <li><Link href="/plans" className="hover:text-green-400">{t.nav.plans}</Link></li>
              <li><Link href="/meals" className="hover:text-green-400">{t.nav.meals}</Link></li>
              <li><Link href="/personal-plan" className="hover:text-green-400">{t.nav.personal}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t.footer.follow}</h3>
            <ul className="space-y-2">
              <li><a href="https://www.facebook.com/share/1GT8Ey98Re/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">Facebook</a></li>
              <li><a href="https://www.instagram.com/semetoitsmaname" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">Instagram</a></li>
              <li><a href="https://www.youtube.com/yourchannel" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10 text-sm text-gray-500">
          © {currentYear} FitTrack. {t.footer.rights}
        </div>
      </footer>

{showShoppingList && (
  <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
    <div className="bg-gray-800 p-4 rounded-xl shadow-md border border-green-500 text-white">
      <h2 className="text-green-400 text-lg font-semibold mb-4">
        🛒 {t.Main.shoppingTitle}
      </h2>
      <ul className="space-y-2 list-disc list-inside">
        {generateShoppingList().map((item, idx) => (
          <li key={idx} className="text-gray-300">
            <span className="text-white font-medium">{item.name}</span> – {item.amount} {item.unit}
          </li>
        ))}
      </ul>
    </div>
  </section>
)}

      {/* Footer секция */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t.footer.contacts}</h3>
            <p>
              Email:{" "}
              <a href="mailto:fittrackwebsite@gmail.com" className="text-green-400 hover:underline">
                fittrackwebsite@gmail.com
              </a>
            </p>
            <p>
              Телефон:{" "}
              <a href="tel:+359887183887" className="text-green-400 hover:underline">
                +359 887 183 887
              </a>
            </p>
            <p>София, България</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t.footer.quick}</h3>
            <ul className="space-y-2">
              <li><Link href="/calculator" className="hover:text-green-400">{t.nav.calculator}</Link></li>
              <li><Link href="/plans" className="hover:text-green-400">{t.nav.plans}</Link></li>
              <li><Link href="/meals" className="hover:text-green-400">{t.nav.meals}</Link></li>
              <li><Link href="/personal-plan" className="hover:text-green-400">{t.nav.personal}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t.footer.follow}</h3>
            <ul className="space-y-2">
              <li><a href="https://www.facebook.com/share/1GT8Ey98Re/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">Facebook</a></li>
              <li><a href="https://www.instagram.com/semetoitsmaname" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">Instagram</a></li>
              <li><a href="https://www.youtube.com/yourchannel" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10 text-sm text-gray-500">
          © {currentYear} FitTrack. {t.footer.rights}
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
      className="bg-gray-900 text-white rounded-xl w-[90%] max-w-md shadow-lg border border-green-500 flex flex-col overflow-hidden"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 sticky top-0 z-10">
        <h2 className="text-green-400 text-xl font-semibold flex items-center gap-2">
          {selectedMeal.icon} {selectedMeal.name[lang]}
        </h2>
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="p-4 overflow-y-auto" style={{ maxHeight: '70vh' }}>
        {selectedMeal.recipe && (
          <p className="text-sm mb-3 text-gray-300">{selectedMeal.recipe[lang]}</p>
        )}
        <div className="text-sm text-gray-400 space-y-1 font-mono">
          <div>{t.Main.calories} <span className="text-white">{selectedMeal.kcal}</span> kcal</div>
          <div>{t.Main.proteinLabel} <span className="text-white">{selectedMeal.protein}</span> g</div>
          <div>{t.Main.carb}<span className="text-white">{selectedMeal.carbs}</span> g</div>
          <div>{t.Main.fat} <span className="text-white">{selectedMeal.fat}</span> g</div>
          <div>Тегло: <span className="text-white">{selectedMeal.weight}</span> g</div>
        </div>
      </div>
    </motion.div>
  </motion.div>
)}
</AnimatePresence>
    </main>
  );
}