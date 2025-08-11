"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu } from "lucide-react";

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

export default function KetoPage() {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "🥓 Какво е Кето диета?",
      body:
        "Кето диетата е нисковъглехидратен, високомаслен режим на хранене, който цели да постави тялото в състояние на кетоза – използване на мазнини като основен източник на енергия вместо въглехидрати.",
    },
    {
      title: "⚡ Как работи кетозата?",
      body:
        "При намален прием на въглехидрати, черният дроб превръща мазнините в кетонни тела, които служат като алтернативен източник на енергия за мозъка и мускулите.",
    },
    {
      title: "🥩 Какво може да ядеш?",
      list: [
        " Мазнини: авокадо, зехтин, кокосово масло, масло, сметана",
        " Месо и риба: говеждо, свинско, пиле, сьомга, скумрия",
        " Яйца",
        " Зеленчуци с ниско съдържание на въглехидрати: спанак, броколи, карфиол",
        " Ядки и семена",
        " Сирена с високо съдържание на мазнини",
      ],
    },
    {
      title: "🚫 Какво да избягваш?",
      list: [
        " Захари и захарни изделия",
        " Зърнени храни и тестени продукти",
        " Повечето плодове (освен малки количества горски плодове)",
        " Бобови растения",
        " Преработени храни и безалкохолни напитки",
      ],
    },
    {
      title: "💡 Ползи от кето диетата",
      list: [
        " Намаляване на телесното тегло и мазнини",
        " Подобряване на нивата на кръвна захар и инсулин",
        " Повишена умствена концентрация и енергия",
        " Намаляване на апетита",
      ],
    },
    {
      title: "⚠️ Рискове и внимание",
      body:
        "В началото може да се усети „кето грип“ – умора, главоболие, гадене. Важно е да се пият достатъчно вода и електролити. Консултация с лекар при хронични заболявания е препоръчителна.",
    },
    {
      title: "📅 Примерно еднодневно меню",
      list: [
        " Закуска: Яйца с авокадо и бекон",
        " Обяд: Салата с пиле, зехтин и авокадо",
        " Вечеря: Печено месо с броколи на пара и масло",
        " Закуски: Сирене, ядки, маслини",
      ],
    },
    {
      title: "🛠️ Съвети за успешен старт",
      list: [
        " Започни с понижаване на въглехидратите до 20-50 г на ден",
        " Пий много вода и приемай електролити",
        " Избягвай скритите захари и въглехидрати",
        " Следи напредъка и адаптирай приема на макронутриенти",
      ],
    },
    {
      title: "💊 Добавки при кето диета",
      list: [
        " Магнезий и калий",
        " Омега-3 мастни киселини",
        " Витамини от група B",
        " Мултивитамини при нужда",
      ],
    },
    {
      title: "❌ Чести грешки при кето",
      list: [
        " Прекаляване с протеин вместо мазнини",
        " Недостатъчен прием на мазнини",
        " Липса на разнообразие в храната",
        " Пренебрегване на хидратация и електролити",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white font-sans">
      {/* Header */}
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
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="focus:outline-none"
            >
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

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-green-400 mb-10 text-center"
        >
          🥓 Кето диета
        </motion.h1>

        {sections.map((section, index) => (
          <section key={index} className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
            {section.body && <p className="text-gray-300">{section.body}</p>}
            {section.list && (
              <ul className="text-gray-300 list-disc list-inside space-y-1">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="mt-12 text-center">
          <Link href="/plans" className="text-green-400 hover:underline">
            ← Назад към всички режими
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Контакти</h3>
            <p>
              Email:{" "}
              <a
                href="mailto:info@fittrack.bg"
                className="text-green-400 hover:underline"
              >
                info@fittrack.bg
              </a>
            </p>
            <p>
              Телефон:{" "}
              <a
                href="tel:+359888123456"
                className="text-green-400 hover:underline"
              >
                +359 888 123 456
              </a>
            </p>
            <p>Адрес: София, България</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Бързи връзки</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/calculator" className="hover:text-green-400">
                  Калкулатор
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-green-400">
                  Режими
                </Link>
              </li>
              <li>
                <Link href="/meals" className="hover:text-green-400">
                  Ястия
                </Link>
              </li>
              <li>
                <Link href="/personal-plan" className="hover:text-green-400">
                  Персонални режими
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <p>© {currentYear} FitTrack. Всички права запазени.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
