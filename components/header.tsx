"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Bosh sahifa", href: "#home" },
  { label: "Kurs haqida ma'lumot", href: "#services" },
  { label: "O'quvchilar fikri", href: "#testimonials" },
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
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const nameParts = fullName.trim().split(" ");
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "-",
          phone,
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
      alert("Xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="relative w-full max-w-lg bg-zinc-900/90 border-t sm:border border-white/10 p-8 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl backdrop-blur-md"
          >
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                  Kursga yozilish
                </h2>
                <input
                  required
                  placeholder="Ism Familiya"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none"
                />
                <input
                  required
                  type="tel"
                  placeholder="+998"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none"
                />
                <button
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-2xl flex justify-center items-center"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    "Ro'yxatdan o'tish"
                  )}
                </button>
              </form>
            ) : (
              <div className="py-12 flex flex-col items-center">
                <CheckCircle2 size={50} className="text-white mb-4" />
                <h3 className="text-2xl font-bold text-white">
                  Muvaffaqiyatli!
                </h3>
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
    setIsHidden(latest > previous && latest > 150);
    setIsScrolled(latest > 20);
  });

  return (
    <>
      <style>{`
        .nav-link { font-family: 'Space Mono', monospace; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.45); transition: color 0.3s; position: relative; }
        .nav-link:hover { color: #fff; }
        .logo-text { font-family: 'Anton', sans-serif; background: linear-gradient(135deg, #fff 0%, #dc2626 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .enroll-btn { font-family: 'Space Mono', monospace; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 900; padding: 12px 28px; background: #dc2626; color: white; border-radius: 2px; transition: 0.3s; }
        .enroll-btn:hover { background: #fff; color: #000; transform: translateY(-2px); }
      `}</style>

      <motion.header
        initial={{ y: -100, opacity: 0 }} // Birinchi kirish animatsiyasi
        animate={{ y: isHidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled ? "rgba(0,0,0,0.9)" : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-[95%] lg:max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <Link href="/" className="logo-text text-xl md:text-2xl font-black">
            SHOXJAXON <span className="text-red-600">AXMEDOV</span>
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
            <button className="enroll-btn" onClick={() => setIsModalOpen(true)}>
              Kursga yozilish
            </button>
          </nav>
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </motion.header>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
