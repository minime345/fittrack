"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";

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

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear(); // 👈 тук дефинираме годината

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white font-sans">
      {/* Навигация */}
       <header className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
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

      {/* Hero секция */}
      <section className="max-w-6xl mx-auto text-center px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-green-400 mb-6"
        >
          Добре дошъл във FitTrack
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Твоят личен асистент за калории, хранителни режими и здравословен начин на живот.
          Изчисли своя дневен калориен прием, открий полезни режими и вдъхновяващи рецепти.
        </motion.p>

        {/* Бутони */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
        >
          <Link
            href="/calculator"
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition"
          >
            Изчисли калории
          </Link>
          <Link
            href="/personal-plan"
            className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition"
          >
            Персонален режим
          </Link>
        </motion.div>

        {/* Изображение */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Image
            src="/homepage-fitness.jpg"
            alt="Fit Lifestyle"
            width={720}
            height={480}
            className="mx-auto rounded-3xl shadow-2xl border border-white/10"
          />
        </motion.div>
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