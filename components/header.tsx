"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
// 1. Kutubxonani import qilamiz
import { PatternFormat } from "react-number-format";

const navItems = [
  { label: "Bosh sahifa", href: "#home" },
  { label: "Kurs ma'lumoti", href: "#services" },
  { label: "O‘quvchilar fikri", href: "#testimonials" },
];

function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState(""); // Bu yerda faqat raqamlar saqlanadi

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Raqam to'liqligini tekshirish (9 ta raqam bo'lishi kerak)
    if (phone.length < 9) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting");
      return;
    }

    setIsLoading(true);
    try {
      const nameParts = fullName.trim().split(" ");
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "-",
          // Telegramga chiroyli formatda yuboramiz
          phone: `+998 ${phone.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "($1) $2-$3-$4")}`,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFullName("");
        setPhone("");
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      }
    } catch (err) {
      alert("Xatolik yuz berdi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-lg bg-zinc-900 border-t border-white/10 p-6 sm:p-8 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl"
          >
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter">
                    Ro'yxatdan o'tish
                  </h2>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 text-zinc-500 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <input
                  required
                  placeholder="Ism Familiya"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-red-600 transition-all placeholder:text-zinc-600"
                />

                {/* Telefon raqam uchun maskali input */}
                <PatternFormat
                  required
                  format="+998 (##) ###-##-##"
                  mask="_"
                  value={phone}
                  onValueChange={(values) => setPhone(values.value)}
                  placeholder="+998 (__) ___-__-__"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-red-600 transition-all placeholder:text-zinc-600"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 text-white font-black py-4 rounded-xl flex justify-center items-center active:scale-95 transition-all disabled:bg-zinc-800 disabled:text-zinc-500"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "TASDIQLASH"
                  )}
                </button>
              </form>
            ) : (
              <div className="py-10 flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-green-500/20 p-4 rounded-full mb-4"
                >
                  <CheckCircle2 size={60} className="text-green-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">
                  Muvaffaqiyatli!
                </h3>
                <p className="text-zinc-400 mt-2">Siz bilan bog'lanamiz.</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

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

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
