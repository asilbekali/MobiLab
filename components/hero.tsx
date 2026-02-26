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
  const bgX = useTransform(smoothX, [0, 1], [-15, 15]);
  const bgY = useTransform(smoothY, [0, 1], [-15, 15]);

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
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* BACKGROUND & IMAGE SECTION */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0 flex items-start justify-center"
      >
        <motion.div
          className="w-full h-full relative"
          style={{ x: bgX, y: bgY }}
        >
          {/* IMAGE WITH GRADIENT MASK */}
          <div className="relative w-full h-[50vh] sm:h-[80vh] px-[5px]">
            <img
              src="/herobg.png"
              alt="Shoxjaxon Ahmedov"
              className="w-full h-full object-contain object-top select-none [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
            />
          </div>
          
          {/* SMOOTH BLUR & GRADIENT OVERLAY */}
          <div className="absolute inset-x-0 bottom-0 h-[60%] z-10 pointer-events-none">
            {/* Bu qatlam rasm kesilgan joyni butunlay yashiradi */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent z-20" />
            
            {/* Yumshoq blur effekti */}
            <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_40%,transparent_100%)] z-10" />
          </div>
        </motion.div>
      </motion.div>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 pb-10 sm:pb-20 relative z-30">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-[60%]"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-red-600" />
              <span className="text-red-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest italic">
                Professional Mobilograf & Mentor
              </span>
            </div>

            <h1 className="text-[12vw] sm:text-[10vw] lg:text-[85px] font-black leading-[0.85] uppercase mb-6 italic text-white">
              <span className="text-red-600 block">Shoxjaxon</span>
              <span className="block">Axmedov</span>
            </h1>

            <p className="text-zinc-300 text-sm sm:text-lg max-w-sm mb-6 font-medium">
              Kreativ kontent orqali brendingizni rivojlantiring. 
              Mobilografiya xizmati va professional kurslar.
            </p>

            {/* MARKETING TIMER */}
            <div className="mb-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-white/90">
                <Timer size={16} className="text-red-600 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                  Chegirma tugashiga:
                </span>
                <span className="bg-red-600 px-2 py-0.5 rounded text-white font-mono text-sm font-bold">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-10 py-4 bg-red-600 text-white font-black uppercase text-xs tracking-[0.2em] rounded-full shadow-lg shadow-red-600/20"
            >
              Kursga yozilish
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* FLOATING SOCIALS */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center">
        <AnimatePresence>
          {showSocials && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              className="flex flex-col gap-4 mb-4"
            >
              {[
                { icon: <Phone size={22} />, color: "bg-green-500", href: "tel:+998901234567" },
                { icon: <Send size={22} />, color: "bg-[#0088cc]", href: "https://t.me/shoxjaxon_axmedov" },
                { icon: <Instagram size={22} />, color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600", href: "https://instagram.com/sh_akhmeedov/" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target={item.href.includes("tel") ? "_self" : "_blank"}
                  className={`w-12 h-12 rounded-full ${item.color} text-white flex items-center justify-center shadow-xl`}
                >
                  {item.icon}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowSocials(!showSocials)}
          className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl"
        >
          {showSocials ? <X size={24} /> : <Instagram size={24} />}
        </button>
      </div>
    </section>
  );
}