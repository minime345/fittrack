"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import { translations, type Lang } from "@/lib/translations";
import { useLang } from "@/context/LangContext";
import { Analytics } from "@vercel/analytics/react";

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

export default function Calculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("bg"); // default bg
  const [age, setAge] = useState<number | "">(25);
  const [weight, setWeight] = useState<number | "">(70);
  const [height, setHeight] = useState<number | "">(175);
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState(1.2);
  const [bodyFat, setBodyFat] = useState<number | "" | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [usedFormula, setUsedFormula] = useState<string>("");
  const [proteinRange, setProteinRange] = useState<[number, number] | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const resultRef = useRef<HTMLDivElement>(null);

  // Client-side effect за език
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

  // Преводи
  const t = translations[lang] || translations.bg;

  const handleNumberChange =
    (setter: (val: number | "") => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setter(value === "" ? "" : Number(value));
    };

  const calculateCalories = () => {
    if (age === "" || weight === "" || height === "") {
      alert(t.calculator.alertFill);
      return;
    }

    let bmr;
    if (bodyFat !== null && bodyFat !== "" && bodyFat > 0 && bodyFat < 100) {
      const leanMass = Number(weight) * (1 - Number(bodyFat) / 100);
      bmr = 370 + 21.6 * leanMass;
      setUsedFormula(t.calculator.formulaKatch);
    } else {
      bmr =
        gender === "male"
          ? 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5
          : 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;
      setUsedFormula(t.calculator.formulaMifflin);
    }

    const calories = bmr * activity;
    setResult(Math.round(calories));

    const proteinMin = Number(weight) * 1.6;
    const proteinMax = Number(weight) * 2.2;
    setProteinRange([Math.round(proteinMin), Math.round(proteinMax)]);

    setShowResult(false);
    setTimeout(() => setShowResult(true), 50);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white/5 rounded-xl shadow-xl backdrop-blur-md border border-white/10 p-8">
          <h1 className="text-3xl font-extrabold text-green-400 mb-6 text-center">{t.calculator.title}</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculateCalories();
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            <InputField label={t.calculator.age} value={age} onChange={handleNumberChange(setAge)} />
            <InputField label={t.calculator.weight} value={weight} onChange={handleNumberChange(setWeight)} />
            <InputField label={t.calculator.height} value={height} onChange={handleNumberChange(setHeight)} />

            <div>
              <label className="block mb-1 font-medium">{t.calculator.gender}</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white focus:outline-green-400"
              >
                <option value="male">{t.calculator.male}</option>
                <option value="female">{t.calculator.female}</option>
              </select>
            </div>

            <div>
  <label className="block mb-1 font-medium">{t.calculator.activity}</label>
  <select
    value={activity}
    onChange={(e) => setActivity(Number(e.target.value))}
    className="w-full p-2 rounded bg-gray-800 text-white focus:outline-green-400"
  >
    {t.calculator.activityOptions.map((label, idx) => {
      const values = [1.2, 1.375, 1.55, 1.725, 1.9]; // съответните коефициенти
      return (
        <option key={idx} value={values[idx]}>
          {label}
        </option>
      );
    })}
  </select>
</div>

            <InputField
              label={t.calculator.bodyFat}
              value={bodyFat ?? ""}
              onChange={(e) =>
                setBodyFat(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder={t.calculator.option}
            />

            <button
              type="submit"
              className="sm:col-span-2 mt-4 w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-lg transition"
            >
              {t.calculator.calculate}
            </button>
          </form>

          {result && (
            <div
              ref={resultRef}
              className={`mt-10 bg-gray-900/60 px-4 sm:px-6 py-6 rounded-lg shadow-inner text-center space-y-4
                transition-all duration-500 ease-out
                ${showResult ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
            >
              <p className="text-xl font-semibold">{t.calculator.resultCalories}</p>
              <p className="text-4xl font-bold text-green-400">{result} kcal</p>
              <p className="italic text-gray-400">{usedFormula}</p>

              {proteinRange && (
                <div className="mt-6 text-center">
                  <p className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent">
                    {t.calculator.proteinRange}: <br className="sm:hidden" />
                    {proteinRange[0]} - {proteinRange[1]} {t.calculator.prot}
                  </p>
                </div>
              )}
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
  <InfoCard title={t.calculator.quickCard[0]} value={result - 500} />
  <InfoCard title={t.calculator.quickCard[1]} value={result - 250} />
  <InfoCard title={t.calculator.quickCard[2]} value={result} />
  <InfoCard title={t.calculator.quickCard[3]} value={result + 300} />
</div>

              <button
                onClick={() => {
                  router.push(
                    `/personal-plan?calories=${result}&age=${age}&weight=${weight}&height=${height}&gender=${gender}&activity=${activity}&bodyFat=${bodyFat ?? ''}&proteinMin=${proteinRange?.[0]}&proteinMax=${proteinRange?.[1]}`
                  );
                }}
                className="mt-6 w-full sm:w-auto bg-green-500 hover:bg-green-600 text-black font-semibold py-3 px-6 rounded-lg transition"
              >
                {t.calculator.planButton}
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
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
              {t.footer.phone}{" "}
              <a href="tel:+359887183887" className="text-green-400 hover:underline">
                +359 887 183 887
              </a>
            </p>
            <p>{t.footer.address}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t.footer.quick}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/calculator" className="hover:text-green-400">
                  {t.nav.calculator}
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-green-400">
                  {t.nav.plans}
                </Link>
              </li>
              <li>
                <Link href="/meals" className="hover:text-green-400">
                  {t.nav.meals}
                </Link>
              </li>
              <li>
                <Link href="/personal-plan" className="hover:text-green-400">
                  {t.nav.personal}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t.footer.follow}</h3>
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
                  href="https://www.instagram.com/semetoitsmaname"
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
          © {currentYear} FitTrack. {t.footer.rights}
        </div>
      </footer>

      {/* Vercel Analytics */}
      <Analytics />
    </main>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: number | "";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 rounded bg-gray-800 text-white focus:outline-green-400"
      />
    </div>
  );
}
function InfoCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow text-center">
      <h3 className="text-green-300 font-semibold text-sm mb-1">{title}</h3>
      <p className="text-white font-bold text-lg">{value} kcal</p>
    </div>
  );
}
