"use client";

import { motion } from "framer-motion";
import { Instagram, ArrowUp, Send, Phone } from "lucide-react";
import { useState } from "react";
// Yangi universal modalni import qilamiz
import ContactModal from "./ContactModal";

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

  const socials = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/sh_akhmeedov/",
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
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight uppercase tracking-tighter italic">
              Keling, birgalikda <br />
              <span className="text-red-600">ijod qilamiz</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-md mb-10 font-medium leading-relaxed">
              Mobilografiya orqali brendingizni yangi darajaga olib chiqing.
              Professional bilimlar va kreativ yondashuv.
            </p>

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
                <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter mb-2 italic">
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

      {/* Umumiy modalni shu yerda chaqiramiz */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </footer>
  );
}
