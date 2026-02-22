"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react"; // Yuklanish uchun
import { useState } from "react";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form ma'lumotlari uchun state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Ism va familiyani ajratish (API firstName va lastName so'rayapti)
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "-"; // Familiya bo'lmasa "-" qo'yadi

    try {
      const response = await fetch("/api/telegram", {
        // Route manzilingizga qarang (/api/telegram bo'lishi kerak)
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFullName(""); // Tozalash
        setPhone("");
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        alert("Xatolik: " + data.error);
      }
    } catch (err) {
      alert("Server bilan bog'lanishda xatolik yuz berdi");
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
                    type="text"
                    placeholder="Ism Familiya"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-600"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="+998"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-600"
                  />
                  <button
                    disabled={isLoading}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 text-white font-bold py-5 rounded-2xl text-lg transition-all active:scale-[0.98] shadow-lg shadow-red-600/20 flex justify-center items-center"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin mr-2" />
                    ) : (
                      "Ro'yxatdan o'tish"
                    )}
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
