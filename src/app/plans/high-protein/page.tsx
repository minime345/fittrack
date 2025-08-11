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

export default function HighProteinPage() {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "🍗 Какво е Високо протеинова диета?",
      body:
        "Високопротеиновата диета акцентира върху увеличения прием на протеин с цел подкрепа на мускулния растеж, възстановяване и намаляване на телесните мазнини.",
    },
    {
      title: "💪 Ползи от високо протеинова диета",
      list: [
        " Подпомага изграждането и възстановяването на мускулите",
        " Подобрява чувството за ситост и контролира апетита",
        " Ускорява метаболизма и подпомага отслабването",
        " Поддържа здравословни кости и стави",
      ],
    },
    {
      title: "🥩 Какво може да ядеш?",
      list: [
        " Месо: пилешко, пуешко, говеждо, свинско",
        " Риба и морски дарове",
        " Яйца и млечни продукти с ниско съдържание на мазнини",
        " Бобови: леща, нахут, боб (умерено)",
        " Ядки и семена",
        " Протеинови пудри и добавки",
        " Зеленчуци, особено зелени листни",
      ],
    },
    {
      title: "🚫 Какво да избягваш?",
      list: [
        " Преработени храни с много захар и мазнини",
        " Газирани и захарни напитки",
        " Прекалено много въглехидрати и бързи храни",
        " Излишна мазнина и пържени ястия",
      ],
    },
    {
      title: "📅 Примерно еднодневно меню",
      list: [
        " Закуска: Омлет с гъби и спанак",
        " Обяд: Пилешко месо на скара с киноа и зеленчуци",
        " Вечеря: Риба със задушени броколи и салата",
        " Закуски: Гръцко кисело мляко с ядки, протеинов шейк",
      ],
    },
    {
      title: "⚠️ Важни съвети",
      body:
        "Пий достатъчно вода, разпределяй протеина равномерно през деня и комбинирай с физическа активност за максимален ефект.",
    },
    {
      title: "🛠️ Добавки при високо протеинова диета",
      list: [
        " Протеинови пудри (суроватъчен, растителен протеин)",
        " BCAA (аминокиселини с разклонена верига)",
        " Омега-3 мастни киселини",
        " Витамини и минерали според нуждите",
      ],
    },
    {
      title: "❌ Чести грешки",
      list: [
        " Недостатъчен прием на течности",
        " Прекаляване с протеин без баланс с други макронутриенти",
        " Липса на разнообразие в храната",
        " Игнориране на физическа активност",
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
          🍗 Високо протеинова диета
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
