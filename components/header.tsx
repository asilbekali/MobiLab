"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// --- NAVIGATSIYA ---
const navItems = [
  { label: "Bosh sahifa", href: "#home" },
  { label: "Kurs haqida ma'lumot", href: "#services" },
  { label: "O'quvchilar fikri", href: "#testimonials" },
];

// --- SIZ SO'RAGAN IXCHAM KONTAK MODAL ---
function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-zinc-900/90 border-t sm:border border-white/10 p-8 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl backdrop-blur-md"
          >
            {!isSuccess ? (
              <>
                <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-8 sm:hidden" />
                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
                  Kursga yozilish
                </h2>
                <p className="text-zinc-400 mb-8">
                  Ma'lumotlaringizni qoldiring, adminlarimiz tez orada
                  bog'lanishadi.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <input
                      required
                      type="text"
                      placeholder="Ism Familiya"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <input
                      required
                      type="tel"
                      placeholder="+998"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-600"
                    />
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-2xl text-lg transition-all active:scale-[0.98] shadow-lg shadow-red-600/20">
                    Ro'yxatdan o'tish
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-red-600/40"
                >
                  <CheckCircle2 size={50} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white text-center">
                  Muvaffaqiyatli!
                </h3>
                <p className="text-zinc-400 text-center mt-2">
                  Tez orada sizga aloqaga chiqamiz.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- ASOSIY HEADER KOMPONENTI ---
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 20);
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono&family=Anton&display=swap');

        .nav-link {
          position: relative;
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: #dc2626;
          transition: width 0.3s ease;
        }
        .nav-link:hover, .nav-link.active { color: #fff; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .logo-text {
          font-family: 'Anton', sans-serif;
          letter-spacing: 0.02em;
          background: linear-gradient(135deg, #ffffff 0%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .enroll-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 900;
          padding: 12px 28px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
          box-shadow: 0 5px 15px rgba(220, 38, 38, 0.3);
        }
        .enroll-btn:hover {
          background: #fff;
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(255, 255, 255, 0.15);
        }
      `}</style>

      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${activeItem === i ? "active" : ""}`}
                onClick={() => setActiveItem(i)}
              >
                {item.label}
              </a>
            ))}
            <button className="enroll-btn" onClick={() => setIsModalOpen(true)}>
              Kursga yozilish
            </button>
          </nav>

          {/* Mobile Button Only */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed inset-0 bg-black z-40 md:hidden flex flex-col px-8 py-20"
            >
              {navItems.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white text-2xl font-bold uppercase py-4 border-b border-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                className="enroll-btn w-full mt-10 py-5 text-sm"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
              >
                Kursga yozilish
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* SIZ BERGAN MODAL */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
