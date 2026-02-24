"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
// Yangi modalni import qilamiz (fayl yo'li to'g'riligini tekshiring)
import ContactModal from "./ContactModal";

const navItems = [
  { label: "Bosh sahifa", href: "#home" },
  { label: "Kurs ma'lumoti", href: "#services" },
  { label: "O‘quvchilar fikri", href: "#testimonials" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150 && !isMobileMenuOpen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    if (isMobileMenuOpen || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen, isModalOpen]);

  return (
    <>
      <style>{`
        .logo-text { font-family: 'Anton', sans-serif; background: linear-gradient(135deg, #fff 40%, #dc2626 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .nav-link { font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.6); transition: 0.3s; }
        .enroll-btn-header { font-family: 'Space Mono', monospace; font-size: 0.7rem; font-weight: 900; padding: 10px 20px; background: #dc2626; color: white; border-radius: 4px; text-transform: uppercase; }
      `}</style>

      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? "rgba(0,0,0,0.9)" : "transparent",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          paddingTop: isScrolled ? "12px" : "24px",
          paddingBottom: isScrolled ? "12px" : "24px",
        }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between relative z-[1010]">
          <Link
            href="/"
            className="logo-text text-xl md:text-2xl font-black tracking-tighter"
          >
            SHOXJAXON <span className="text-red-600">AXMEDOV</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => setIsModalOpen(true)}
              className="enroll-btn-header hover:bg-white hover:text-black transition-all"
            >
              Kursga yozilish
            </button>
          </nav>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[999] md:hidden flex flex-col pt-32 px-10 gap-8"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-transparent to-transparent"></div>

            <nav className="flex flex-col gap-6 relative z-10">
              {navItems.map((item, idx) => (
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-black text-white uppercase tracking-tighter hover:text-red-600 transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-xl tracking-widest relative z-10 active:scale-95 transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            >
              KURSGA YOZILISH
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Yangi ContactModal bu yerda chaqiriladi */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
