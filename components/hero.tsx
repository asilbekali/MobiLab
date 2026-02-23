"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Instagram, Send, X, CheckCircle2, Loader2, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";

// --- CONTACT MODAL ---
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
    if (phone.length < 9) {
      alert("Telefon raqamingizni to'liq kiriting!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone: `+998 ${phone}` }),
      });
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      }
    } catch (err) {
      alert("Xatolik!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="relative w-full max-w-lg bg-zinc-900/90 border-t border-white/10 p-8 rounded-t-[2.5rem] sm:rounded-[2.5rem] backdrop-blur-2xl"
          >
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-black text-white italic">
                    KURSGA YOZILISH
                  </h2>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-zinc-500 hover:text-white"
                  >
                    <X />
                  </button>
                </div>
                <input
                  required
                  placeholder="Ism Familiya"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-red-600 transition-all"
                />
                <PatternFormat
                  required
                  format="+998 (##) ###-##-##"
                  mask="_"
                  value={phone}
                  onValueChange={(v) => setPhone(v.value)}
                  placeholder="+998 (__) ___-__-__"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-red-600 transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 text-white font-black py-4 rounded-xl active:scale-95 transition-transform uppercase"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Tasdiqlash"
                  )}
                </button>
              </form>
            ) : (
              <div className="py-10 text-center">
                <CheckCircle2
                  size={60}
                  className="text-green-500 mx-auto mb-4"
                />
                <h3 className="text-white font-bold">Muvaffaqiyatli!</h3>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- MAIN HERO ---
export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

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
  }, []);

  return (
    <section
      id="home"
      className="relative h-[100svh] w-full overflow-hidden bg-black flex flex-col justify-end"
    >
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* BACKGROUND & IMAGE ANIMATION */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
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
            alt="Hero"
            /* Mobileda 10px tepaga ko'tarish: transform -translate-y-[10px] */
            className="w-full h-[75vh] sm:h-full object-contain object-bottom select-none mt-[-15vh] sm:mt-0 transform -translate-y-[10px] sm:translate-y-0"
          />

          <div className="absolute inset-x-0 bottom-0 h-[50%] z-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
            <div className="absolute inset-0 backdrop-blur-[10px] [mask-image:linear-gradient(to_top,black_20%,transparent_100%)] z-10" />
          </div>
        </motion.div>
      </motion.div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 pb-16 sm:pb-24 relative z-30">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full lg:w-[50%] lg:text-left"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-[2px] bg-red-600" />
              <span className="text-red-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest italic">
                Professional Mobilograf
              </span>
            </div>

            {/* Ism familiya mobileda to'liq chiqishi uchun text-size moslashtirildi */}
            <h1 className="text-[12vw] sm:text-[15vw] lg:text-[85px] font-black leading-[0.85] uppercase mb-6 italic">
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
                className="text-white block"
              >
                Axmedov
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-zinc-400 text-sm sm:text-lg max-w-sm mb-10 font-medium"
            >
              Kreativ kontent orqali brendingizni rivojlantiring. Mobilografiya
              xizmati va kurslar.
            </motion.p>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#fff",
                color: "#000",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-12 py-5 bg-red-600 text-white font-black uppercase text-xs tracking-[0.2em] rounded-full shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-colors"
            >
              Kursga yozilish
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* SOCIALS */}
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
                {
                  icon: <Phone size={22} />,
                  color: "bg-green-500",
                  href: "tel:+998901234567",
                },
                {
                  icon: <Send size={22} />,
                  color: "bg-[#0088cc]",
                  href: "https://t.me/shoxjaxon_axmedov",
                },
                {
                  icon: <Instagram size={22} />,
                  color:
                    "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
                  href: "https://instagram.com/sh_akhmeedov/",
                },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  target={item.href.includes("tel") ? "_self" : "_blank"}
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
