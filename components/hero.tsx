"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Instagram, Send, X, Phone, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import ContactModal from "./ContactModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 0 ? 120 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const bgX = useTransform(smoothX, [0, 1], [-20, 20]);
  const bgY = useTransform(smoothY, [0, 1], [-20, 20]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative h-[100svh] w-full overflow-hidden bg-black flex flex-col justify-end"
    >
      <div className="sr-only">
        <h2>Shoxjaxon Ahmedov - Professional Mobilografiya va Reels Kurslari</h2>
        <p>Mobilografiya kurslari, video montaj va professional reels sirlari.</p>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* BACKGROUND & IMAGE SECTION */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          className="w-full h-full relative"
          style={{ x: bgX, y: bgY }}
        >
          <img
            src="/herobg.png"
            alt="Shoxjaxon Ahmedov"
            className="w-full h-full object-contain object-bottom select-none translate-y-[5%]"
            style={{
              // Rasmning pastki qismini yumshoq yo'qotish (Fade effect)
              WebkitMaskImage: 'linear-gradient(to top, transparent 5%, black 40%)',
              maskImage: 'linear-gradient(to top, transparent 5%, black 40%)',
            }}
          />
          
          {/* Pastki qismdagi qoralikni yanada chuqurlashtirish */}
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        </motion.div>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 pb-16 sm:pb-24 relative z-30">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full lg:w-[60%] lg:text-left"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-[2px] bg-red-600" />
              <span className="text-red-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest italic">
                Professional Mobilograf & Mentor
              </span>
            </div>

            <h1 className="text-[12vw] sm:text-[15vw] lg:text-[85px] font-black leading-[0.85] uppercase mb-6 italic text-white">
              <motion.span
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-red-600 block"
              >
                Shoxjaxon
              </motion.span>
              <motion.span
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="block"
              >
                Axmedov
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-zinc-400 text-sm sm:text-lg max-w-sm mb-8 font-medium"
            >
              Kreativ kontent orqali brendingizni rivojlantiring. Mobilografiya
              xizmati va professional kurslar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="mb-8 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3 text-white/90">
                <Timer size={20} className="text-red-600 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase">
                  Chegirma tugashiga:
                </span>
                <span className="bg-red-600 px-3 py-1 rounded text-white font-mono text-lg font-bold">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-12 py-5 bg-red-600 text-white font-black uppercase text-xs tracking-[0.2em] rounded-full shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all"
            >
              Kursga yozilish
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* FLOATING SOCIALS */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-center">
        <AnimatePresence>
          {showSocials && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              className="flex flex-col gap-4 mb-5"
            >
              {[
                { icon: <Phone size={22} />, color: "bg-green-500", href: "tel:+998901234567" },
                { icon: <Send size={22} />, color: "bg-[#0088cc]", href: "https://t.me/shoxjaxon_axmedov" },
                { icon: <Instagram size={22} />, color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600", href: "https://instagram.com/sh_akhmeedov/" },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className={`w-14 h-14 rounded-full ${item.color} text-white flex items-center justify-center shadow-2xl`}
                >
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ rotate: 90 }}
          onClick={() => setShowSocials(!showSocials)}
          className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl relative z-10"
        >
          {showSocials ? <X size={28} /> : <Instagram size={28} />}
        </motion.button>
      </div>
    </section>
  );
}