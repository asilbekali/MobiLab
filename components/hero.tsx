"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Instagram, Send, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import ContactModal from "./ContactModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 25 });

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

  // Container animatsiyasi (bolalarini ketma-ket chiqarish uchun)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Har bir element orasidagi farq
        delayChildren: 0.5, // Umumiy boshlanish kechikishi
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-black flex flex-col justify-end"
    >
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* BACKGROUND IMAGE ANIMATSIYASI */}
      <motion.div
        className="absolute inset-[-40px] z-0"
        style={{ x: bgX, y: bgY }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/herobg.png')",
            backgroundPosition: "center 25%",
            filter: "brightness(0.6) contrast(1.1)",
          }}
        />
      </motion.div>

      {/* OVERLAY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/40 to-transparent"
      />

      {/* ASOSIY MATN KONTENTI */}
      <div className="max-w-7xl mx-auto w-full px-6 pb-12 lg:pb-24 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-[50%]"
        >
          {/* Mobilograf label */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-4 lg:mb-6"
          >
            <span className="w-6 lg:w-10 h-[1px] bg-red-600" />
            <span className="text-red-600 text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.4em]">
              Professional Mobilograf
            </span>
          </motion.div>

          {/* Ism Sharif */}
          <motion.h1
            variants={itemVariants}
            className="text-[10vw] lg:text-[85px] font-black leading-[0.85] uppercase tracking-tighter mb-6 lg:mb-10"
          >
            <span className="text-red-600 block">Shoxjaxon</span>
            <span className="text-white block">Axmedov</span>
          </motion.h1>

          {/* Tavsif */}
          <motion.p
            variants={itemVariants}
            className="text-zinc-400 text-[11px] lg:text-lg max-w-[280px] lg:max-w-md font-medium mb-8 lg:mb-12 leading-relaxed opacity-80"
          >
            Kreativ kontent orqali brendingizni rivojlantiring. Mobilografiya
            xizmati va daromadli kurslar.
          </motion.p>

          {/* Tugma */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-red-600 text-white font-black uppercase text-[10px] lg:text-[11px] tracking-widest shadow-2xl rounded-sm hover:bg-red-700 transition-all"
            >
              Kursga yozilish
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* FIXED SOCIAL MEDIA - Sayt ochilganda pastdan chiqib keladi */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="fixed bottom-8 right-6 lg:bottom-12 lg:right-12 z-[100] flex flex-col items-center"
      >
        <AnimatePresence>
          {showSocials && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.5 }}
              className="flex flex-col gap-4 mb-4"
            >
              <SocialLink
                href="https://instagram.com"
                icon={<Instagram size={20} />}
                hoverClass="hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
              />
              <SocialLink
                href="https://t.me"
                icon={<Send size={20} />}
                hoverClass="hover:bg-[#0088cc]"
              />
              <SocialLink
                href="tel:+998"
                icon={<Phone size={20} />}
                hoverClass="hover:bg-green-600"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setShowSocials(!showSocials)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all shadow-2xl z-[101] ${
            showSocials ? "bg-red-600 text-white" : "bg-white text-black"
          }`}
        >
          {showSocials ? <X size={28} /> : <Instagram size={28} />}
        </motion.button>
      </motion.div>

      <style jsx>{`
        @media (max-width: 1024px) {
          div[style*="background-image"] {
            background-position: 50% 20% !important;
            background-size: 155% !important;
          }
        }
      `}</style>
    </section>
  );
}

// Yordamchi komponent kodni tozalash uchun
function SocialLink({
  href,
  icon,
  hoverClass,
}: {
  href: string;
  icon: React.ReactNode;
  hoverClass: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      whileHover={{ scale: 1.1 }}
      className={`w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-all shadow-xl hover:text-white ${hoverClass}`}
    >
      {icon}
    </motion.a>
  );
}
