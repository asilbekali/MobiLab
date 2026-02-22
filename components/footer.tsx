"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Instagram, ArrowUp, CheckCircle2, Send, Phone } from "lucide-react";
import { useState } from "react";

// --- CONTACT MODAL ---
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />
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
                  <input
                    required
                    placeholder="Ism Familiya"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-600"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="+998"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-600"
                  />
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-2xl text-lg transition-all active:scale-[0.98] shadow-lg shadow-red-600/20">
                    Ro'yxatdan o'tish
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 flex flex-col items-center">
                <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-red-600/40">
                  <CheckCircle2 size={50} className="text-white" />
                </div>
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

// --- ASOSIY FOOTER ---
export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Bosh sahifa", href: "#home" },
    { name: "Kurs haqida ma'lumot", href: "#services" },
    { name: "O'quvchilar fikri", href: "#testimonials" },
  ];

  // YANGILANGAN IJTIMOIY TARMOQLAR RO'YXATI
  const socials = [
    {
      icon: Instagram,
      href: "https://instagram.com/shoxjaxon_axmedov",
      hoverColor:
        "hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    },
    {
      icon: Send,
      href: "https://t.me/shoxjaxon_axmedov",
      hoverColor: "hover:bg-[#0088cc]",
    },
    {
      icon: Phone,
      href: "tel:+998901234567",
      hoverColor: "hover:bg-green-600",
    },
  ];

  return (
    <footer className="bg-black border-t border-zinc-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight uppercase tracking-tighter">
              Keling, birgalikda <br />
              <span className="text-red-600">ijod qilamiz</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-md mb-10 font-medium leading-relaxed">
              Mobilografiya orqali brendingizni yangi darajaga olib chiqing.
              Professional bilimlar va kreativ yondashuv.
            </p>

            {/* IJTIMOIY TARMOQLAR IKONALARI */}
            <div className="flex gap-4">
              {socials.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className={`w-12 h-12 bg-zinc-900 border border-white/5 rounded-full flex items-center justify-center text-white transition-all duration-300 ${item.hoverColor}`}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full group relative overflow-hidden bg-red-600 p-[2px] rounded-[2.5rem] transition-transform active:scale-[0.98]"
            >
              <div className="bg-zinc-950 group-hover:bg-transparent transition-colors duration-500 rounded-[calc(2.5rem-1px)] p-12 lg:p-16 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-red-600/40">
                  <Send className="text-white ml-1" size={32} />
                </div>
                <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter mb-2">
                  Kursga yozilish
                </h3>
                <p className="text-zinc-500 group-hover:text-white transition-colors font-mono uppercase tracking-widest text-xs">
                  Hoziroq joyingizni band qiling
                </p>
              </div>
            </button>
            <div className="absolute -z-10 inset-0 bg-red-600/20 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-zinc-500 text-[10px] font-mono tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} SHOXJAXON AXMEDOV. Barcha huquqlar
            himoyalangan.
          </div>

          <div className="flex items-center gap-10">
            <nav className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 hover:text-white transition-colors"
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </footer>
  );
}
